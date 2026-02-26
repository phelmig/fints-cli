import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Text } from '../dataElements/Text.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIKIMSegment = Segment & {
    subject: string;
    text: string;
};
/**
 * Information to the customer of the bank
 */
export declare class HIKIM extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (AlphaNumeric | Text)[];
}
//# sourceMappingURL=HIKIM.d.ts.map