import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Country } from '../dataElements/Country.js';
import { DataGroup } from './DataGroup.js';
export class BankIdentification extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [new Country('country', 1, 1), new AlphaNumeric('bankId', 1, 1, 30)], minCount, maxCount, minVersion, maxVersion);
    }
}
