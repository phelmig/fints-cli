import type { Account } from './Account.js';
import { DataGroup } from './DataGroup.js';
export type SepaAccount = Account & {
    isSepaAccount?: boolean;
    iban?: string;
    bic?: string;
};
export declare class SepaAccountGroup extends DataGroup {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
}
//# sourceMappingURL=SepaAccount.d.ts.map