import type { LimitType } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { type Account } from '../dataGroups/Account.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { type Money } from '../dataGroups/Money.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIUPDSegment = Segment & {
    account: Account;
    iban: string;
    customerId: string;
    accountType: number;
    currency: string;
    accountHolder1: string;
    accountHolder2?: string;
    accountProduct?: string;
    accountLimit?: AccountLimit;
    allowedTransactions?: AllowedTransactions[];
    accountExtension?: string;
};
export type AccountLimit = {
    limitType: LimitType;
    limitAmount: Money;
    limitDays: number;
};
export type AllowedTransactions = {
    transId: string;
    numSignatures: number;
    limitType?: LimitType;
    limitAmount?: Money;
    limitDays?: number;
};
/**
 * User parameters account information
 */
export declare class HIUPD extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (AlphaNumeric | DataGroup | Numeric)[];
}
//# sourceMappingURL=HIUPD.d.ts.map