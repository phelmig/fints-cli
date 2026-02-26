import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { type Account, AccountGroup } from '../dataGroups/Account.js';
import type { SegmentWithContinuationMark } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKSPASegment = SegmentWithContinuationMark & {
    accounts?: Account[];
    maxEntries?: number;
};
/**
 * Request SEPA account connections (IBAN/BIC information)
 * Version 3 - supports account specification, max entries and continuation
 */
export declare class HKSPA extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | AccountGroup | Numeric)[];
}
//# sourceMappingURL=HKSPA.d.ts.map