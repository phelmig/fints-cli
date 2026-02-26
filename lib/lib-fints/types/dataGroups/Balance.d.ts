import { DataGroup } from './DataGroup.js';
import { type Money } from './Money.js';
export type Balance = {
    creditDebit: string;
    amount: Money;
    date: Date;
    time?: Date;
};
export declare class BalanceGroup extends DataGroup {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
}
//# sourceMappingURL=Balance.d.ts.map