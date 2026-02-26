import { DataGroup } from './DataGroup.js';
export type Bank = {
    country: number;
    bankId: string;
};
export type Account = {
    accountNumber: string;
    subAccountId?: string;
    bank: Bank;
};
export declare class AccountGroup extends DataGroup {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
}
//# sourceMappingURL=Account.d.ts.map