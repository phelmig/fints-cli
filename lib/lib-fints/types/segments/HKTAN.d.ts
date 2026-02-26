import type { TanProcess } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Binary } from '../dataElements/Binary.js';
import { Numeric } from '../dataElements/Numeric.js';
import { YesNo } from '../dataElements/YesNo.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { type InternationalAccount } from '../dataGroups/InternationalAccount.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKTANSegment = Segment & {
    tanProcess: TanProcess;
    segId: string;
    customerAccount?: InternationalAccount;
    orderHash?: string;
    orderRef?: string;
    nextTan?: boolean;
    cancelOrder?: boolean;
    smsAccount?: InternationalAccount;
    challengeClass?: number;
    challengeClassParam?: string[];
    tanMedia?: string;
    hhducResponse?: HhducResponse;
};
export type HhducResponse = {
    atc: string;
    appCryptoAc: string;
    efIdData: string;
    cvr: string;
    chipTanVersion: string;
};
/**
 * Two-Step TAN
 */
export declare class HKTAN extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | YesNo | DataGroup | Numeric | Binary)[];
}
//# sourceMappingURL=HKTAN.d.ts.map