import type { Language } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKVVBSegment = Segment & {
    bpdVersion: number;
    updVersion: number;
    dialogLanguage: Language;
    productId: string;
    productVersion: string;
};
/**
 * Identification
 */
export declare class HKVVB extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | Numeric)[];
}
//# sourceMappingURL=HKVVB.d.ts.map