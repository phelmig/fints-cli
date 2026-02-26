import { Binary } from '../dataElements/Binary.js';
import { Identification } from '../dataElements/Identification.js';
import { Text } from '../dataElements/Text.js';
import { type Balance, BalanceGroup } from '../dataGroups/Balance.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type DIKKUSegment = Segment & {
    balance: Balance;
    transactions: string[];
};
/**
 * Credit card transactions within period response
 */
export declare class DIKKU extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (Identification | Text | Binary | BalanceGroup)[];
}
//# sourceMappingURL=DIKKU.d.ts.map