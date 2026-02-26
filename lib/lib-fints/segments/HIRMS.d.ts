import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
import type { Answer } from './HIRMG.js';
export type HIRMSSegment = Segment & {
    answers: Answer[];
};
/**
 * Responses to the message
 */
export declare class HIRMS extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: DataGroup[];
}
//# sourceMappingURL=HIRMS.d.ts.map