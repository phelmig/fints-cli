import type { SegmentHeader } from './segmentHeader.js';
export type Segment = {
    header: SegmentHeader;
};
export type SegmentWithContinuationMark = Segment & {
    continuationMark?: string;
};
export declare function decode(text: string): Segment;
export declare function encode(data: Segment): string;
export declare function segmentToString(segment: Segment): string;
//# sourceMappingURL=segment.d.ts.map