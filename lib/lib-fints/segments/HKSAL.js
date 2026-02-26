import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { YesNo } from '../dataElements/YesNo.js';
import { AccountGroup } from '../dataGroups/Account.js';
import { InternationalAccountGroup, } from '../dataGroups/InternationalAccount.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Request Account balances
 */
export class HKSAL extends SegmentDefinition {
    static Id = 'HKSAL';
    static Version = 8;
    constructor() {
        super(HKSAL.Id);
    }
    version = HKSAL.Version;
    elements = [
        new AccountGroup('account', 1, 1, 1, 6),
        new InternationalAccountGroup('account', 1, 1, 7),
        new YesNo('allAccounts', 1, 1),
        new Numeric('maxEntries', 0, 1, 4),
        new AlphaNumeric('continuationMark', 0, 1, 35),
    ];
}
