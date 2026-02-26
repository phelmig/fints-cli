import { Numeric } from '../dataElements/Numeric.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HNHBSSegment = Segment & {
    msgNr: number;
};
/**
 * Message end
 */
export declare class HNHBS extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: Numeric[];
}
//# sourceMappingURL=HNHBS.d.ts.map