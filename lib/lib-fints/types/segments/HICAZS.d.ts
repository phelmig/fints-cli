import { BusinessTransactionParameter, type BusinessTransactionParameterSegment } from './businessTransactionParameter.js';
export type HICAZSSegment = BusinessTransactionParameterSegment<HICAZSParameter>;
export type HICAZSParameter = {
    maxDays: number;
    entryCountAllowed: boolean;
    allAccountsAllowed: boolean;
    supportedCamtFormats: string[];
};
/**
 * Parameters for HKCAZ business transaction (CAMT format statement retrieval)
 */
export declare class HICAZS extends BusinessTransactionParameter {
    static Id: string;
    version: number;
    constructor();
}
//# sourceMappingURL=HICAZS.d.ts.map