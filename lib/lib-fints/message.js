import { HashAlgorithm } from './codes.js';
import { splitBySeparator } from './parser.js';
import { PARTED } from './partedSegment.js';
import { decode, encode, segmentToString } from './segment.js';
import { SegmentDefinition } from './segmentDefinition.js';
import { HIRMG } from './segments/HIRMG.js';
import { HIRMS } from './segments/HIRMS.js';
import { HNHBK } from './segments/HNHBK.js';
import { HNHBS } from './segments/HNHBS.js';
import { HNSHA } from './segments/HNSHA.js';
import { HNSHK } from './segments/HNSHK.js';
import { HNVSD } from './segments/HNVSD.js';
import { HNVSK } from './segments/HNVSK.js';
import { getSegmentDefinition } from './segments/registry.js';
import { UnkownId } from './unknownSegment.js';
export class Message {
    segments;
    constructor(segments) {
        this.segments = segments;
    }
    findSegment(segmentId) {
        const segments = this.findAllSegments(segmentId);
        return segments.length > 0 ? segments[0] : undefined;
    }
    findAllSegments(segmentId) {
        return this.segments.filter((segment) => segment.header.segId === segmentId);
    }
    findAllUnknownSegments(segmentId) {
        const unknownSegments = this.segments.filter((segment) => segment.header.segId === UnkownId);
        return unknownSegments.filter((segment) => segment.originalId === segmentId);
    }
    hasReturnCode(code) {
        const hirmg = this.findSegment(HIRMG.Id);
        const hirmsList = this.findAllSegments(HIRMS.Id);
        return (hirmg?.answers.some((answer) => answer.code === code) ||
            hirmsList.some((hirms) => hirms.answers.some((answer) => answer.code === code)));
    }
    getHighestReturnCode() {
        const hirmg = this.findSegment(HIRMG.Id);
        const hirmsList = this.findAllSegments(HIRMS.Id);
        const allAnswers = hirmg ? [...hirmg.answers] : [];
        hirmsList.forEach((hirms) => {
            allAnswers.push(...hirms.answers);
        });
        return allAnswers.reduce((max, answer) => (answer.code > max ? answer.code : max), 0);
    }
    getBankAnswers() {
        const bankAnswers = [];
        const hirmgSegments = this.findAllSegments(HIRMG.Id);
        hirmgSegments.forEach((hirmg) => {
            bankAnswers.push(...hirmg.answers.map((message) => ({
                code: message.code,
                text: message.text,
                params: message.params,
            })));
        });
        const hirmsSegments = this.findAllSegments(HIRMS.Id);
        hirmsSegments.forEach((hirms) => {
            bankAnswers.push(...hirms.answers.map((message) => ({
                code: message.code,
                text: message.text,
                params: message.params,
            })));
        });
        return bankAnswers;
    }
    static decode(text, partedResponseSegId) {
        const segmentTexts = splitBySeparator(text, "'").filter((text) => !!text);
        const segments = segmentTexts.map((text) => Message.decodeSegment(text, partedResponseSegId));
        const hnvskIndex = segments.findIndex((segment) => segment.header.segId === HNVSK.Id);
        const hnvsdIndex = segments.findIndex((segment) => segment.header.segId === HNVSD.Id);
        const isEncrypted = hnvskIndex !== -1 && hnvsdIndex !== -1 && hnvsdIndex - hnvskIndex === 1;
        if (isEncrypted) {
            const hnvsd = segments[hnvsdIndex];
            const hnvsdSegmentTexts = splitBySeparator(hnvsd.encryptedData, "'").filter((text) => !!text);
            const hnvsdSegments = hnvsdSegmentTexts.map((text) => Message.decodeSegment(text, partedResponseSegId));
            segments.splice(hnvskIndex, 2, ...hnvsdSegments);
        }
        const message = new Message(segments);
        return message;
    }
    static decodeSegment(text, partedResponseSegId) {
        if (partedResponseSegId && text.startsWith(partedResponseSegId)) {
            const partedSegment = {
                header: {
                    ...SegmentDefinition.header.decode(text, 1),
                    segId: PARTED.Id,
                },
                originalId: partedResponseSegId,
                rawData: text,
            };
            return partedSegment;
        }
        return decode(text);
    }
    toString(includeUnknown = false) {
        let text = `Message with ${this.segments.length} segments:\n`;
        text += this.segments
            .filter((segment) => includeUnknown || segment.header.segId !== UnkownId)
            .map((segment) => segmentToString(segment))
            .join('\n');
        return text;
    }
}
export class CustomerMessage extends Message {
    lastSignatureNumber = 0;
    constructor(dialogId = '0', msgNr = 1) {
        const hnhbk = {
            header: { segId: HNHBK.Id, segNr: 0, version: HNHBK.Version },
            messageLength: 0,
            hbciVersion: 300,
            dialogId: dialogId,
            msgNr: msgNr,
        };
        const hnhbs = {
            header: { segId: HNHBS.Id, segNr: 0, version: HNHBS.Version },
            msgNr: msgNr,
        };
        super([hnhbk, hnhbs]);
    }
    encode() {
        if (this.segments.length < 3) {
            throw new Error('a message must contain at least three segments');
        }
        if (this.segments[0].header.segId !== HNHBK.Id) {
            throw new Error('the first segment in a message must always be of type HNHBK');
        }
        if (this.segments[this.segments.length - 1].header.segId !== HNHBS.Id) {
            throw new Error('the last segment in a message must always be of type HNHBS');
        }
        let segmentNumber = 1;
        this.segments.forEach((segment) => {
            segment.header.segNr = segmentNumber++;
        });
        let segments = this.segments;
        if (this.lastSignatureNumber > 0) {
            const firstSignature = this.findSegment(HNSHK.Id);
            if (!firstSignature) {
                throw new Error('no signature segment found in message');
            }
            const now = new Date();
            const hnvsk = {
                header: { segId: HNVSK.Id, segNr: 998, version: HNVSK.Version },
                secProfile: { secMethod: 'PIN', secVersion: 1 },
                secFunc: 998,
                secRole: 1,
                secId: { partyType: 1, partyId: firstSignature.secId.partyId },
                dateTime: { type: 1, date: now, time: now },
                encryption: {
                    use: 2,
                    mode: 2,
                    algorithm: 13,
                    keyParamValue: '00000000',
                    keyParamName: 5,
                    initParamName: 1,
                },
                key: {
                    bank: firstSignature.key.bank,
                    userId: firstSignature.key.userId,
                    keyType: 'S',
                    keyNr: 0,
                    keyVersion: 0,
                },
                compressMethod: 0,
            };
            const innerSegments = segments.slice(1, -1);
            const hnvsd = {
                header: { segId: HNVSD.Id, segNr: 999, version: HNVSD.Version },
                encryptedData: innerSegments.map((segment) => encode(segment)).join(''),
            };
            segments = [this.segments[0], hnvsk, hnvsd, this.segments[this.segments.length - 1]];
        }
        const encodedMessage = segments.map((segment) => encode(segment)).join('');
        const messageHeader = segments[0];
        messageHeader.messageLength = encodedMessage.length;
        const encodedHeader = encode(messageHeader);
        return encodedHeader + encodedMessage.substring(encodedHeader.length);
    }
    sign(countryCode, bankId, userId, pin, systemId, tanMethodId, tan) {
        const now = new Date();
        this.lastSignatureNumber++;
        const hnshk = {
            header: { segId: HNSHK.Id, segNr: 0, version: HNSHK.Version },
            secProfile: { secMethod: 'PIN', secVersion: tanMethodId ? 2 : 1 },
            secFunc: tanMethodId ?? 999,
            secControlRef: this.lastSignatureNumber.toString(),
            secArea: 1,
            secRole: 1,
            secId: { partyType: 1, partyId: systemId ?? '0' },
            secRefNum: 1,
            dateTime: { type: 1, date: now, time: now },
            hash: { use: 1, algorithm: HashAlgorithm.SHA256, paramName: 1 },
            signature: { use: 6, algorithm: 10, mode: 16 },
            key: {
                bank: { country: countryCode, bankId: bankId },
                userId: userId,
                keyType: 'S',
                keyNr: 0,
                keyVersion: 0,
            },
        };
        this.segments.splice(1, 0, hnshk);
        const pinTan = { pin: pin, tan: tan };
        const hnsha = {
            header: { segId: HNSHA.Id, segNr: 0, version: HNSHA.Version },
            secControlRef: this.lastSignatureNumber.toString(),
            customSignature: pinTan,
        };
        this.segments.splice(this.segments.length - 1, 0, hnsha);
    }
    addSegment(segment) {
        let firstSignatureEndIndex = this.segments.findIndex((segment) => segment.header.segId === HNSHA.Id);
        if (firstSignatureEndIndex === -1) {
            firstSignatureEndIndex = this.segments.length - 1;
        }
        this.segments.splice(firstSignatureEndIndex, 0, segment);
    }
}
export class CustomerOrderMessage extends CustomerMessage {
    orderSegId;
    orderResponseSegId;
    constructor(orderSegId, orderResponseSegId, dialogId = '0', msgNr = 1) {
        super(dialogId, msgNr);
        this.orderSegId = orderSegId;
        this.orderResponseSegId = orderResponseSegId;
    }
    get supportsPartedResponseSegments() {
        const definition = getSegmentDefinition(this.orderSegId);
        return definition?.elements.some((element) => element.name === 'continuationMark') ?? false;
    }
}
