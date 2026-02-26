import type { BankAnswer } from './bankAnswer.js';
import type { Segment } from './segment.js';
import { type UnknownSegment } from './unknownSegment.js';
export declare class Message {
    segments: Segment[];
    constructor(segments: Segment[]);
    findSegment<T extends Segment>(segmentId: string): T | undefined;
    findAllSegments<T extends Segment>(segmentId: string): T[];
    findAllUnknownSegments(segmentId: string): UnknownSegment[];
    hasReturnCode(code: number): boolean;
    getHighestReturnCode(): number;
    getBankAnswers(): BankAnswer[];
    static decode(text: string, partedResponseSegId?: string): Message;
    static decodeSegment(text: string, partedResponseSegId?: string): Segment;
    toString(includeUnknown?: boolean): string;
}
export declare class CustomerMessage extends Message {
    lastSignatureNumber: number;
    constructor(dialogId?: string, msgNr?: number);
    encode(): string;
    sign(countryCode: number, bankId: string, userId: string, pin: string, systemId?: string, tanMethodId?: number, tan?: string): void;
    addSegment(segment: Segment): void;
}
export declare class CustomerOrderMessage extends CustomerMessage {
    orderSegId: string;
    orderResponseSegId: string;
    constructor(orderSegId: string, orderResponseSegId: string, dialogId?: string, msgNr?: number);
    get supportsPartedResponseSegments(): boolean;
}
//# sourceMappingURL=message.d.ts.map