import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { Numeric } from '../dataElements/Numeric.js';
import { type Account, AccountGroup } from '../dataGroups/Account.js';
import type { SegmentWithContinuationMark } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type DKKKUSegment = SegmentWithContinuationMark & {
    account: Account;
    accountNumber: string;
    subAccountId: string | undefined;
    from?: Date;
    maxEntries?: number;
};
/**
 * Request credit card transactions in a given period
 */
export declare class DKKKU extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | AccountGroup | Numeric | Dat)[];
}
//# sourceMappingURL=DKKKU.d.ts.map