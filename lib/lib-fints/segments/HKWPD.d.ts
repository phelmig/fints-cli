import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { type Account, AccountGroup } from '../dataGroups/Account.js';
import { SegmentDefinition } from '../segmentDefinition.js';
import type { SegmentHeader } from '../segmentHeader.js';
export type HKWPDSegment = {
    header: SegmentHeader;
    /**
     * Depot
     */
    depot: Account;
    /**
     * Optional: Currency of the portfolio statement
     */
    currency?: string;
    /**
     * Optional: Price quality
     * 1 = Current prices (Realtime)
     * 2 = Delayed prices (Delayed)
     */
    priceQuality?: '1' | '2';
    /**
     * Optional: Maximum number of entries
     */
    maxEntries?: number;
    /**
     * Pagination marker
     * Optional: If a pagination marker was previously returned
     */
    paginationMarker?: string;
};
/**
 * Geschäftsvorfälle: C.4.3.1 Depotaufstellung
 * Version: 6
 */
export declare class HKWPD extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | AccountGroup | Numeric)[];
}
//# sourceMappingURL=HKWPD.d.ts.map