import { HITAN } from '../segments/HITAN.js';
import { HNHBK } from '../segments/HNHBK.js';
export class CustomerInteraction {
    segId;
    dialog;
    constructor(segId) {
        this.segId = segId;
    }
    getSegments(config) {
        return this.createSegments(config);
    }
    handleClientResponse(message) {
        const clientResponse = this.handleBaseResponse(message);
        const currentBankingInformationSnapshot = JSON.stringify(this.dialog?.config.bankingInformation);
        if (clientResponse.success && !clientResponse.requiresTan) {
            this.handleResponse(message, clientResponse);
        }
        clientResponse.bankingInformationUpdated =
            currentBankingInformationSnapshot !== JSON.stringify(this.dialog?.config.bankingInformation);
        return clientResponse;
    }
    parseHHDUC(tanChallengeHHDUC) {
        let offset = 0;
        // convert the string with binary data to a byte array
        const bytes = new Uint8Array(tanChallengeHHDUC.length);
        for (let i = 0; i < tanChallengeHHDUC.length; i++) {
            bytes[i] = tanChallengeHHDUC.charCodeAt(i) & 0xff;
        }
        const countAsString = Array.from(bytes.slice(offset, 2), (b) => String(b)).join('');
        offset += 2;
        const count = parseInt(countAsString, 10);
        const mimeTypeArray = bytes.slice(offset, offset + count);
        const mimeType = new TextDecoder('iso-8859-1').decode(mimeTypeArray);
        offset += count;
        // image size is 2 bytes, little endian
        const hi = bytes[offset];
        const lo = bytes[offset + 1];
        const imageSize = (hi << 8) + lo;
        offset += 2;
        const image = bytes.slice(offset, offset + imageSize);
        return { mimeType, image };
    }
    handleBaseResponse(response) {
        const hnhbk = response.findSegment(HNHBK.Id);
        const dialogId = hnhbk?.dialogId ?? '';
        const bankAnswers = response.getBankAnswers();
        if (response.hasReturnCode(30) ||
            response.hasReturnCode(3955) ||
            response.hasReturnCode(3956) ||
            response.hasReturnCode(3957)) {
            const hitan = response.findSegment(HITAN.Id);
            if (hitan) {
                return {
                    dialogId,
                    success: true,
                    bankingInformationUpdated: false,
                    bankAnswers: bankAnswers,
                    requiresTan: true,
                    tanReference: hitan.orderReference,
                    tanChallenge: hitan.challenge ??
                        bankAnswers.find((answer) => answer.code === 3955)?.text ??
                        bankAnswers.find((answer) => answer.code === 3956)?.text ??
                        bankAnswers.find((answer) => answer.code === 3957)?.text ??
                        '',
                    tanPhoto: hitan.challengeHhdUc ? this.parseHHDUC(hitan.challengeHhdUc) : undefined,
                    tanMediaName: hitan.tanMedia,
                };
            }
            else {
                throw new Error('HITAN segment not found in response, despite return code indicating security approval');
            }
        }
        return {
            dialogId,
            success: response.getHighestReturnCode() < 9000,
            bankingInformationUpdated: false,
            bankAnswers: bankAnswers,
            requiresTan: false,
        };
    }
}
export class CustomerOrderInteraction extends CustomerInteraction {
    responseSegId;
    constructor(segId, responseSegId) {
        super(segId);
        this.responseSegId = responseSegId;
    }
}
