import { Amount } from '../dataElements/Amount.js';
import { Currency } from '../dataElements/Currency.js';
import { DataGroup } from './DataGroup.js';
export class MoneyGroup extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [new Amount('value', 1, 1), new Currency('currency', 1, 1)], minCount, maxCount, minVersion, maxVersion);
    }
}
