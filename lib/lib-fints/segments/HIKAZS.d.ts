import { BusinessTransactionParameter, type BusinessTransactionParameterSegment } from './businessTransactionParameter.js';
export type HKKAZSegment = BusinessTransactionParameterSegment<HIKAZSParameter>;
export type HIKAZSParameter = {
    maxDays: number;
    entryCountAllowed: boolean;
    allAccountsAllowed: boolean;
};
/**
 * Parameters for HKKAZ business transaction
 */
export declare class HIKAZS extends BusinessTransactionParameter {
    static Id: string;
    version: number;
    constructor();
}
//# sourceMappingURL=HIKAZS.d.ts.map