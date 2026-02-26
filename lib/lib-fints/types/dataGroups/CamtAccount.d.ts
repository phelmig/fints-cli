import { DataGroup } from './DataGroup.js';
export type CamtAccount = {
    iban?: string;
    bic?: string;
};
export declare class CamtAccountGroup extends DataGroup {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
}
//# sourceMappingURL=CamtAccount.d.ts.map