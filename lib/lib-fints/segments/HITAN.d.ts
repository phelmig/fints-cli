import type { TanProcess } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Binary } from '../dataElements/Binary.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { TimeStamp } from '../dataGroups/TimeStamp.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HITANSegment = Segment & {
    tanProcess: TanProcess;
    orderHash?: string;
    orderReference?: string;
    challenge?: string;
    challengeHhdUc?: string;
    challengeValidUntil?: TimeStamp;
    tanMedia?: string;
};
/**
 * TAN response
 */
export declare class HITAN extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (AlphaNumeric | DataGroup | Binary)[];
}
//# sourceMappingURL=HITAN.d.ts.map