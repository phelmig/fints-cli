import { Binary } from '../dataElements/Binary.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIKAZSegment = Segment & {
    bookedTransactions: string;
    notedTransactions?: string;
};
/**
 * Account transactions within period response
 */
export declare class HIKAZ extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: Binary[];
}
//# sourceMappingURL=HIKAZ.d.ts.map