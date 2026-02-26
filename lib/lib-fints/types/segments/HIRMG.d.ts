import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIRMGSegment = Segment & {
    answers: Answer[];
};
export type Answer = {
    code: number;
    refElement?: string;
    text: string;
    params?: string[];
};
/**
 * Responses to the message
 */
export declare class HIRMG extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: DataGroup[];
}
//# sourceMappingURL=HIRMG.d.ts.map