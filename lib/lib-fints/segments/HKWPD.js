import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { AccountGroup } from '../dataGroups/Account.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Geschäftsvorfälle: C.4.3.1 Depotaufstellung
 * Version: 6
 */
export class HKWPD extends SegmentDefinition {
    static Id = 'HKWPD';
    static Version = 6;
    constructor() {
        super(HKWPD.Id);
    }
    version = HKWPD.Version;
    elements = [
        new AccountGroup('depot', 1, 1),
        new AlphaNumeric('currency', 0, 1, 3),
        new AlphaNumeric('priceQuality', 0, 1, 1),
        new Numeric('maxEntries', 0, 1, 4),
        new AlphaNumeric('paginationMarker', 0, 1, 35),
    ];
}
