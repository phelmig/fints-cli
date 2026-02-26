import { Text } from './dataElements/Text.js';
import type { Segment } from './segment.js';
import { SegmentDefinition } from './segmentDefinition.js';
export type PartedSegment = Segment & {
    originalId: string;
    rawData: string;
};
export declare class PARTED extends SegmentDefinition {
    static Id: string;
    constructor();
    version: number;
    elements: Text[];
}
export declare const PartedId: string;
//# sourceMappingURL=partedSegment.d.ts.map