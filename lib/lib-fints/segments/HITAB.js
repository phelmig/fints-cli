import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { Identification } from '../dataElements/Identification.js';
import { Numeric } from '../dataElements/Numeric.js';
import { AccountGroup } from '../dataGroups/Account.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { InternationalAccountGroup, } from '../dataGroups/InternationalAccount.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * TAN media response
 */
export class HITAB extends SegmentDefinition {
    static Id = 'HITAB';
    constructor() {
        super(HITAB.Id);
    }
    version = 5;
    elements = [
        new Numeric('tanUsage', 1, 1, 1),
        new DataGroup('mediaList', [
            new AlphaNumeric('class', 1, 1, 1),
            new Numeric('status', 1, 1, 1),
            new Numeric('secFunc', 0, 1, 3, 5),
            new Identification('cardNumber', 0, 1),
            new Identification('followUpCardNumber', 0, 1),
            new Numeric('cardType', 0, 1, 2),
            new AccountGroup('account', 0, 1),
            new Dat('validFrom', 0, 1),
            new Dat('validTo', 0, 1),
            new AlphaNumeric('tanListNumber', 0, 1, 20),
            new AlphaNumeric('name', 0, 1, 32),
            new AlphaNumeric('mobilePhoneNumberObfuscated', 0, 1, 32),
            new AlphaNumeric('mobilePhoneNumber', 0, 1, 32),
            new InternationalAccountGroup('smsAccount', 0, 1),
            new Numeric('availableTanCount', 0, 1, 3),
            new Dat('lastUseDate', 0, 1),
            new Dat('activationDate', 0, 1),
        ], 0, 99),
    ];
}
