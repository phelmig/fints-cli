import { BusinessTransactionParameter, type BusinessTransactionParameterSegment } from './businessTransactionParameter.js';
export type HISPASSegment = BusinessTransactionParameterSegment<HISPASParameter>;
export type HISPASParameter = {
    individualAccountRetrievalAllowed: boolean;
    nationalAccountAllowed: boolean;
    structuredPurposeAllowed: boolean;
    maxEntriesAllowed?: boolean;
    reservedPurposePositions?: number;
    supportedSepaFormats?: string[];
};
/**
 * Parameters for HKSPA business transaction - SEPA account connection request
 * Version 3 supports all parameters including reserved purpose positions
 */
export declare class HISPAS extends BusinessTransactionParameter {
    static Id: string;
    version: number;
    constructor();
}
//# sourceMappingURL=HISPAS.d.ts.map