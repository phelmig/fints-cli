import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { AccountGroup } from '../dataGroups/Account.js';
import { type Balance, BalanceGroup } from '../dataGroups/Balance.js';
import { InternationalAccountGroup } from '../dataGroups/InternationalAccount.js';
import { type Money, MoneyGroup } from '../dataGroups/Money.js';
import { type TimeStamp, TimeStampGroup } from '../dataGroups/TimeStamp.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HISALSegment = Segment & {
    account: InternationalAccountGroup | AccountGroup;
    product: string;
    currency: string;
    balance: Balance;
    notedBalance?: Balance;
    creditLimit?: Money;
    availableAmount?: Money;
    usedAmount?: Money;
    overDraft?: Money;
    timestamp?: TimeStamp;
    dueDate?: Date;
    seizable?: Money;
};
/**
 * Account balances response
 */
export declare class HISAL extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (AlphaNumeric | AccountGroup | MoneyGroup | Dat | BalanceGroup | InternationalAccountGroup | TimeStampGroup)[];
}
//# sourceMappingURL=HISAL.d.ts.map