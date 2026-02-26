import { Numeric } from '../dataElements/Numeric.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
import type { SegmentHeader } from '../segmentHeader.js';
import type { Certificate, Key, SecDateTime, SecIdentification, SecProfile } from './HNSHK.js';
export type HNVSKSegment = Segment & {
    header: SegmentHeader & {
        segNr: 998;
    };
    secProfile: SecProfile;
    secFunc: number;
    secRole: number;
    secId: SecIdentification;
    dateTime: SecDateTime;
    encryption: Encryption;
    key: Key;
    compressMethod: number;
    certificate?: Certificate;
};
export type Encryption = {
    use: number;
    mode: number;
    algorithm: number;
    keyParamValue: string;
    keyParamName: number;
    initParamName: number;
    initParamValue?: string;
};
/**
 * Encryption body
 */
export declare class HNVSK extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (DataGroup | Numeric)[];
    setSegmentNumber(_segmentNumber: number): number;
}
//# sourceMappingURL=HNVSK.d.ts.map