import { Text } from '../dataElements/Text.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { type InternationalAccount } from '../dataGroups/InternationalAccount.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HICAZSegment = Segment & {
    account: InternationalAccount;
    camtDescriptor: string;
    bookedTransactions: string[];
    notedTransactions?: string[];
};
/**
 * Account transactions within period response (CAMT format)
 */
export declare class HICAZ extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (DataGroup | Text)[];
}
//# sourceMappingURL=HICAZ.d.ts.map