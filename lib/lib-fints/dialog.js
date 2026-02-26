import { TanMediaRequirement, TanProcess } from './codes.js';
import { HttpClient } from './httpClient.js';
import { CustomerOrderInteraction, } from './interactions/customerInteraction.js';
import { EndDialogInteraction } from './interactions/endDialogInteraction.js';
import { InitDialogInteraction } from './interactions/initDialogInteraction.js';
import { CustomerMessage, CustomerOrderMessage } from './message.js';
import { PARTED } from './partedSegment.js';
import { decode } from './segment.js';
import { HKEND } from './segments/HKEND.js';
import { HKTAN } from './segments/HKTAN.js';
import { HNHBK } from './segments/HNHBK.js';
export class Dialog {
    config;
    dialogId = '0';
    lastMessageNumber = 0;
    interactions = [];
    responses = new Map();
    currentInteractionIndex = 0;
    isInitialized = false;
    hasEnded = false;
    httpClient;
    constructor(config, syncSystemId = false) {
        this.config = config;
        if (!this.config) {
            throw new Error('configuration must be provided');
        }
        this.httpClient = this.getHttpClient();
        this.interactions.push(new InitDialogInteraction(this.config, syncSystemId));
        this.interactions.push(new EndDialogInteraction());
        this.interactions.forEach((interaction) => {
            interaction.dialog = this;
        });
    }
    get currentInteraction() {
        return this.interactions[this.currentInteractionIndex];
    }
    async start() {
        if (this.isInitialized) {
            throw new Error('dialog has already been initialized');
        }
        if (this.hasEnded) {
            throw Error('cannot start a dialog that has already ended');
        }
        if (this.lastMessageNumber > 0) {
            throw new Error('dialog start can only be called on a new dialog');
        }
        let clientResponse;
        do {
            const message = this.createCurrentCustomerMessage();
            const responseMessage = await this.httpClient.sendMessage(message);
            await this.handlePartedMessages(message, responseMessage, this.currentInteraction);
            clientResponse = this.currentInteraction.handleClientResponse(responseMessage);
            this.checkEnded(clientResponse);
            this.dialogId = clientResponse.dialogId;
            this.responses.set(this.currentInteraction.segId, clientResponse);
            if (clientResponse.success && !clientResponse.requiresTan) {
                this.currentInteractionIndex++;
                if (this.currentInteractionIndex > 0) {
                    this.isInitialized = true;
                }
            }
        } while (!this.hasEnded &&
            this.currentInteractionIndex < this.interactions.length &&
            clientResponse.success &&
            !clientResponse.requiresTan);
        return this.responses;
    }
    async continue(tanOrderReference, tan) {
        if (!tanOrderReference) {
            throw Error('tanOrderReference must be provided to continue a customer order with a TAN');
        }
        if (!this.config.selectedTanMethod?.isDecoupled && !tan) {
            throw Error('TAN must be provided for non-decoupled TAN methods');
        }
        if (this.hasEnded) {
            throw Error('cannot continue a customer order when dialog has already ended');
        }
        if (!this.currentInteraction) {
            throw new Error('there is no running customer interaction in this dialog to continue');
        }
        let clientResponse;
        let isFirstMessage = true;
        do {
            const message = isFirstMessage
                ? this.createCurrentTanMessage(tanOrderReference, tan)
                : this.createCurrentCustomerMessage();
            const responseMessage = await this.httpClient.sendMessage(message);
            await this.handlePartedMessages(message, responseMessage, this.currentInteraction);
            clientResponse = this.currentInteraction.handleClientResponse(responseMessage);
            this.checkEnded(clientResponse);
            this.dialogId = clientResponse.dialogId;
            this.responses.set(this.currentInteraction.segId, clientResponse);
            if (clientResponse.success && !clientResponse.requiresTan) {
                this.currentInteractionIndex++;
                if (this.currentInteractionIndex > 0) {
                    this.isInitialized = true;
                }
            }
            isFirstMessage = false;
        } while (!this.hasEnded &&
            this.currentInteractionIndex < this.interactions.length &&
            clientResponse.success &&
            !clientResponse.requiresTan);
        return this.responses;
    }
    addCustomerInteraction(interaction, afterCurrent = false) {
        if (this.hasEnded) {
            throw Error('cannot queue another customer interaction when dialog has already ended');
        }
        const isCustomerOrder = interaction instanceof CustomerOrderInteraction;
        if (isCustomerOrder && !this.config.isTransactionSupported(interaction.segId)) {
            throw Error(`customer order transaction ${interaction.segId} is not supported according to the BPD`);
        }
        interaction.dialog = this;
        if (afterCurrent) {
            this.interactions.splice(this.currentInteractionIndex + 1, 0, interaction);
            return;
        }
        this.interactions.splice(this.interactions.length - 1, 0, interaction);
    }
    createCurrentCustomerMessage() {
        this.lastMessageNumber++;
        const isCustomerOrder = this.currentInteraction instanceof CustomerOrderInteraction;
        const message = isCustomerOrder
            ? new CustomerOrderMessage(this.currentInteraction.segId, this.currentInteraction.responseSegId, this.dialogId, this.lastMessageNumber)
            : new CustomerMessage(this.dialogId, this.lastMessageNumber);
        const tanMethod = this.config.selectedTanMethod;
        const isScaSupported = tanMethod && tanMethod.version >= 6;
        let isTanMethodNeeded = isScaSupported && this.currentInteraction.segId !== HKEND.Id;
        if (isCustomerOrder) {
            const bankTransaction = this.config.bankingInformation.bpd?.allowedTransactions.find((t) => t.transId === this.currentInteraction.segId);
            isTanMethodNeeded = isTanMethodNeeded && bankTransaction?.tanRequired;
        }
        if (this.config.userId && this.config.pin) {
            message.sign(this.config.countryCode, this.config.bankId, this.config.userId, this.config.pin, this.config.bankingInformation.systemId, isScaSupported ? this.config.tanMethodId : undefined);
        }
        const segments = this.currentInteraction.getSegments(this.config);
        segments.forEach((segment) => {
            message.addSegment(segment);
        });
        if (this.config.userId && this.config.pin && isTanMethodNeeded) {
            const hktan = {
                header: { segId: HKTAN.Id, segNr: 0, version: tanMethod?.version ?? 0 },
                tanProcess: TanProcess.Process4,
                segId: this.currentInteraction.segId,
            };
            message.addSegment(hktan);
        }
        return message;
    }
    createCurrentTanMessage(tanOrderReference, tan) {
        this.lastMessageNumber++;
        const message = new CustomerMessage(this.dialogId, this.lastMessageNumber);
        if (this.config.userId && this.config.pin) {
            message.sign(this.config.countryCode, this.config.bankId, this.config.userId, this.config.pin, this.config.bankingInformation?.systemId, this.config.tanMethodId, tan);
        }
        if (this.config.userId && this.config.pin && this.config.tanMethodId) {
            const hktan = {
                header: { segId: HKTAN.Id, segNr: 0, version: this.config.selectedTanMethod?.version ?? 0 },
                tanProcess: this.config.selectedTanMethod?.isDecoupled
                    ? TanProcess.Status
                    : TanProcess.Process2,
                segId: this.currentInteraction.segId,
                orderRef: tanOrderReference,
                nextTan: false,
                tanMedia: (this.config.selectedTanMethod?.tanMediaRequirement ??
                    TanMediaRequirement.NotAllowed >= TanMediaRequirement.Optional)
                    ? this.config.tanMediaName
                    : undefined,
            };
            message.addSegment(hktan);
        }
        return message;
    }
    async handlePartedMessages(message, responseMessage, interaction) {
        let partedSegment = responseMessage.findSegment(PARTED.Id);
        if (partedSegment) {
            while (responseMessage.hasReturnCode(3040)) {
                const answers = responseMessage.getBankAnswers();
                const segmentWithContinuation = message.segments.find((s) => s.header.segId === interaction.segId);
                if (!segmentWithContinuation) {
                    throw new Error(`Response contains segment with further information, but corresponding segment could not be found or is not specified`);
                }
                const answer = answers.find((a) => a.code === 3040);
                if (!answer || !answer.params || answer.params.length === 0) {
                    throw new Error('Expected bank answer to contain continuation mark parameters (code 3040)');
                }
                segmentWithContinuation.continuationMark = answer.params[0];
                const hnhbkSegment = message.findSegment(HNHBK.Id);
                if (!hnhbkSegment) {
                    throw new Error('HNHBK segment not found in message');
                }
                hnhbkSegment.msgNr = ++this.lastMessageNumber;
                const nextResponseMessage = await this.httpClient.sendMessage(message);
                const nextPartedSegment = nextResponseMessage.findSegment(PARTED.Id);
                if (nextPartedSegment) {
                    nextPartedSegment.rawData =
                        partedSegment.rawData +
                            nextPartedSegment.rawData.slice(nextPartedSegment.rawData.indexOf('+') + 1);
                    partedSegment = nextPartedSegment;
                }
                responseMessage = nextResponseMessage;
            }
            const completeSegment = decode(partedSegment.rawData);
            const index = responseMessage.segments.indexOf(partedSegment);
            responseMessage.segments.splice(index, 1, completeSegment);
        }
    }
    checkEnded(response) {
        if (response.bankAnswers.some((answer) => answer.code === 100) ||
            response.bankAnswers.some((answer) => answer.code === 9000)) {
            this.hasEnded = true;
        }
    }
    getHttpClient() {
        return new HttpClient(this.config.bankingUrl, this.config.debugEnabled);
    }
}
