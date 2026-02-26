import type { TanMediaClass, TanStatus, TanUsage } from '../codes.js';
import { Numeric } from '../dataElements/Numeric.js';
import { type Account } from '../dataGroups/Account.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { type InternationalAccount } from '../dataGroups/InternationalAccount.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HITABSegment = Segment & {
    tanUsage: TanUsage;
    mediaList?: TanMedia[];
};
export type TanMedia = {
    class: TanMediaClass;
    status: TanStatus;
    secFunc?: number;
    cardNumber?: string;
    followUpCardNumber?: string;
    cardType?: number;
    account?: Account;
    validFrom?: Date;
    validTo?: Date;
    tanListNumber?: string;
    name?: string;
    mobilePhoneNumberObfuscated?: string;
    mobilePhoneNumber?: string;
    smsAccount?: InternationalAccount;
    availableTanCount?: number;
    lastUseDate?: Date;
    activationDate?: Date;
};
/**
 * TAN media response
 */
export declare class HITAB extends SegmentDefinition {
    static Id: string;
    constructor();
    version: number;
    elements: (DataGroup | Numeric)[];
}
//# sourceMappingURL=HITAB.d.ts.map