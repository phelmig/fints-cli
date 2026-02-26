import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Binary } from '../dataElements/Binary.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HNSHASegment = Segment & {
    secControlRef: string;
    valResult?: string;
    customSignature?: CustomSignature;
};
export type CustomSignature = {
    pin: string;
    tan?: string;
};
/**
 * Signature end
 */
export declare class HNSHA extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | DataGroup | Binary)[];
}
//# sourceMappingURL=HNSHA.d.ts.map