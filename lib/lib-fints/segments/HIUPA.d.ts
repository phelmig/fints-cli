import type { UpdUsage } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIUPASegment = Segment & {
    internalUserId: string;
    updVersion: number;
    updUsage: UpdUsage;
    userName?: string;
    extension?: string;
};
/**
 * User parameters general
 */
export declare class HIUPA extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (AlphaNumeric | Numeric)[];
}
//# sourceMappingURL=HIUPA.d.ts.map