import type { TanMediaRequirement } from '../codes.js';
import { BusinessTransactionParameter, type BusinessTransactionParameterSegment } from './businessTransactionParameter.js';
export type HITANSSegment = BusinessTransactionParameterSegment<HITANSParameter>;
export type HITANSParameter = {
    oneStepAllowed: boolean;
    multipleTansactions: boolean;
    hashMethod: number;
    tanMethods: HitansTanMethod[];
};
export type HitansTanMethod = {
    secFunc: number;
    tanProcess: number;
    methodId: string;
    zkaMethod?: string;
    zkaVersion?: string;
    methodName: string;
    tanMaxLen?: number;
    format?: number;
    challengeText: string;
    maxChallengeLen: number;
    multipleTans: boolean;
    tanDialogOptions: number;
    cancellation: boolean;
    smsAccountRequired: number;
    customerAccountRequired: number;
    challengeClass: boolean;
    challengeStructured: boolean;
    initMode: string;
    tanMediaRequired: TanMediaRequirement;
    hdducRequired: boolean;
    activeTanMedia: number;
    decoupledMaxStatusRequests?: number;
    decoupledWaitBeforeFirstStatusRequest?: number;
    decoupledWaitBetweenStatusRequests?: number;
    decoupledManualConfirmationAllowed?: boolean;
    decoupledAutoConfirmationAllowed?: boolean;
};
/**
 * Parameters for two-step TAN methods
 */
export declare class HITANS extends BusinessTransactionParameter {
    static Id: string;
    version: number;
    constructor();
}
//# sourceMappingURL=HITANS.d.ts.map