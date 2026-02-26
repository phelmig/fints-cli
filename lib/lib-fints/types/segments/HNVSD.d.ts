import { Binary } from '../dataElements/Binary.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
import type { SegmentHeader } from '../segmentHeader.js';
export type HNVSDSegment = Segment & {
    header: SegmentHeader & {
        segNr: 999;
    };
    encryptedData: string;
};
/**
 * Encrypted data
 */
export declare class HNVSD extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: Binary[];
}
//# sourceMappingURL=HNVSD.d.ts.map