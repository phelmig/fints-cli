import type { Bank } from './Account.js';
import { DataGroup } from './DataGroup.js';
export type InternationalAccount = {
    iban?: string;
    bic?: string;
    accountNumber?: string;
    subAccountId?: string;
    bank?: Bank;
};
export declare class InternationalAccountGroup extends DataGroup {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
}
//# sourceMappingURL=InternationalAccount.d.ts.map