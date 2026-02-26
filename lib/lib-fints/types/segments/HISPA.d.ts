import { type SepaAccount, SepaAccountGroup } from '../dataGroups/SepaAccount.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HISPASegment = Segment & {
    sepaAccounts: SepaAccount[];
};
/**
 * SEPA account connection response - returns IBAN/BIC information
 * Version 3 - returns SEPA account data in ktz format
 */
export declare class HISPA extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: SepaAccountGroup[];
}
//# sourceMappingURL=HISPA.d.ts.map