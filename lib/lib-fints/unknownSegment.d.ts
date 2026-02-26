import { Text } from './dataElements/Text.js';
import type { Segment } from './segment.js';
import { SegmentDefinition } from './segmentDefinition.js';
export type UnknownSegment = Segment & {
    originalId: string;
    rawData: string;
};
export declare class UNKNOW extends SegmentDefinition {
    static Id: string;
    constructor();
    version: number;
    elements: Text[];
}
export declare const UnkownId: string;
//# sourceMappingURL=unknownSegment.d.ts.map