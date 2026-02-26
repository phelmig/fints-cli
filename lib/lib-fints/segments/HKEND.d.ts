import { Identification } from '../dataElements/Identification.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKENDSegment = Segment & {
    dialogId: string;
};
/**
 * Dialog end
 */
export declare class HKEND extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: Identification[];
}
//# sourceMappingURL=HKEND.d.ts.map