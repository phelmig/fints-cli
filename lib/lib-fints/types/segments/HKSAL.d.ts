import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { YesNo } from '../dataElements/YesNo.js';
import { type Account, AccountGroup } from '../dataGroups/Account.js';
import { type InternationalAccount, InternationalAccountGroup } from '../dataGroups/InternationalAccount.js';
import type { SegmentWithContinuationMark } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKSALSegment = SegmentWithContinuationMark & {
    account: Account | InternationalAccount;
    allAccounts: boolean;
    maxEntries?: number;
};
/**
 * Request Account balances
 */
export declare class HKSAL extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | YesNo | AccountGroup | Numeric | InternationalAccountGroup)[];
}
//# sourceMappingURL=HKSAL.d.ts.map