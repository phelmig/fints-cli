import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Bank } from '../dataGroups/Account.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HNSHKSegment = Segment & {
    secProfile: SecProfile;
    secFunc: number;
    secControlRef: string;
    secArea: number;
    secRole: number;
    secId: SecIdentification;
    secRefNum: number;
    dateTime: SecDateTime;
    hash: Hash;
    signature: Signature;
    key: Key;
    certificate?: Certificate;
};
export type SecProfile = {
    secMethod: string;
    secVersion: number;
};
export type SecIdentification = {
    partyType: number;
    cid?: string;
    partyId?: string;
};
export type SecDateTime = {
    type: number;
    date?: Date;
    time?: Date;
};
export type Hash = {
    use: number;
    algorithm: number;
    paramName: number;
    paramValue?: string;
};
export type Signature = {
    use: number;
    algorithm: number;
    mode: number;
};
export type Key = {
    bank: Bank;
    userId: string;
    keyType: string;
    keyNr: number;
    keyVersion: number;
};
export type Certificate = {
    type: number;
    content: string;
};
/**
 * Signature Header
 */
export declare class HNSHK extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | DataGroup | Numeric)[];
}
//# sourceMappingURL=HNSHK.d.ts.map