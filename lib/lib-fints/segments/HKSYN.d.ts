import type { SyncMode } from '../codes.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKSYNSegment = Segment & {
    mode: SyncMode;
};
/**
 * Synchonisation
 */
export declare class HKSYN extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: Numeric[];
}
//# sourceMappingURL=HKSYN.d.ts.map