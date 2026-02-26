import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { Numeric } from '../dataElements/Numeric.js';
import { YesNo } from '../dataElements/YesNo.js';
import { AccountGroup } from '../dataGroups/Account.js';
import { InternationalAccountGroup } from '../dataGroups/InternationalAccount.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Request account transactions in a given period
 */
export class HKKAZ extends SegmentDefinition {
    static Id = 'HKKAZ';
    static Version = 7;
    constructor() {
        super(HKKAZ.Id);
    }
    version = HKKAZ.Version;
    elements = [
        new AccountGroup('account', 1, 1, 1, 6),
        new InternationalAccountGroup('account', 1, 1, 7),
        new YesNo('allAccounts', 1, 1),
        new Dat('from', 0, 1),
        new Dat('to', 0, 1),
        new Numeric('maxEntries', 0, 1, 4),
        new AlphaNumeric('continuationMark', 0, 1, 35),
    ];
}
