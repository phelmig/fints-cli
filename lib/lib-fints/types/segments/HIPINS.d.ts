import { BusinessTransactionParameter, type BusinessTransactionParameterSegment } from './businessTransactionParameter.js';
export type HIPINSSegment = BusinessTransactionParameterSegment<HIPINSParameter>;
export type HIPINSParameter = {
    minPinLen: number;
    maxPinLen: number;
    maxTanLen: number;
    textUserId: string;
    textCustomerId: string;
    transactions: PinTanTransaction[];
};
export type PinTanTransaction = {
    transId: string;
    tanRequired: boolean;
};
/**
 * Parameters for PIN/TAN method
 */
export declare class HIPINS extends BusinessTransactionParameter {
    static Id: string;
    version: number;
    constructor();
}
//# sourceMappingURL=HIPINS.d.ts.map