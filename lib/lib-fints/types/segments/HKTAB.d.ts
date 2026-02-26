import type { TanMediaClass, TanMediaType } from '../codes.js';
import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKTABSegment = Segment & {
    mediaType: TanMediaType;
    mediaClass: TanMediaClass;
};
/**
 * Request TAN media
 */
export declare class HKTAB extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | Numeric)[];
}
//# sourceMappingURL=HKTAB.d.ts.map