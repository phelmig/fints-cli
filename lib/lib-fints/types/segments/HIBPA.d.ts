import type { Language } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Bank } from '../dataGroups/Account.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIBPASegment = Segment & {
    bpdVersion: number;
    bank: Bank;
    bankName: string;
    maxNumTransactions: number;
    supportedLanguages: Language[];
    supportedHbciVersions: number[];
    maxMessageSizeInKb?: number;
    minTimeoutSecs?: number;
    maxTimeoutSecs?: number;
};
/**
 * General bank parameters
 */
export declare class HIBPA extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (AlphaNumeric | DataGroup | Numeric)[];
}
//# sourceMappingURL=HIBPA.d.ts.map