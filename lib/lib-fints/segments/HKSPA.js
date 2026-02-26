import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { AccountGroup } from '../dataGroups/Account.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Request SEPA account connections (IBAN/BIC information)
 * Version 3 - supports account specification, max entries and continuation
 */
export class HKSPA extends SegmentDefinition {
    static Id = 'HKSPA';
    static Version = 3;
    constructor() {
        super(HKSPA.Id);
    }
    version = HKSPA.Version;
    elements = [
        new AccountGroup('accounts', 0, 999),
        new Numeric('maxEntries', 0, 1, 4, 2),
        new AlphaNumeric('continuationMark', 0, 1, 35, 2),
    ];
}
