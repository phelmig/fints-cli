import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { Numeric } from '../dataElements/Numeric.js';
import { YesNo } from '../dataElements/YesNo.js';
import { type Account, AccountGroup } from '../dataGroups/Account.js';
import { InternationalAccountGroup } from '../dataGroups/InternationalAccount.js';
import type { SegmentWithContinuationMark } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKKAZSegment = SegmentWithContinuationMark & {
    account: Account;
    allAccounts: boolean;
    from?: Date;
    to?: Date;
    maxEntries?: number;
};
/**
 * Request account transactions in a given period
 */
export declare class HKKAZ extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | YesNo | AccountGroup | Numeric | Dat | InternationalAccountGroup)[];
}
//# sourceMappingURL=HKKAZ.d.ts.map