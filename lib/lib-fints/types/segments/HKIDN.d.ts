import { Identification } from '../dataElements/Identification.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Bank } from '../dataGroups/Account.js';
import { BankIdentification } from '../dataGroups/BankIdentification.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKIDNSegment = Segment & {
    bank: Bank;
    customerId: string;
    systemId: string;
    systemIdRequired: number;
};
/**
 * Identification
 */
export declare class HKIDN extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (Identification | BankIdentification | Numeric)[];
}
//# sourceMappingURL=HKIDN.d.ts.map