import { Digits } from '../dataElements/Digits.js';
import { Identification } from '../dataElements/Identification.js';
import { Numeric } from '../dataElements/Numeric.js';
import { type RefMessage, RefMessageGroup } from '../dataGroups/RefMessage.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HNHBKSegment = Segment & {
    messageLength: number;
    hbciVersion: number;
    dialogId: string;
    msgNr: number;
    refMsg?: RefMessage;
};
/**
 * Message header
 */
export declare class HNHBK extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (Identification | Digits | Numeric | RefMessageGroup)[];
}
//# sourceMappingURL=HNHBK.d.ts.map