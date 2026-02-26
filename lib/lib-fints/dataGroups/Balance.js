import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { Time } from '../dataElements/Time.js';
import { DataGroup } from './DataGroup.js';
import { MoneyGroup } from './Money.js';
export class BalanceGroup extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [
            new AlphaNumeric('creditDebit', 1, 1, 1),
            new MoneyGroup('amount', 1, 1),
            new Dat('date', 1, 1),
            new Time('time', 0, 1),
        ], minCount, maxCount, minVersion, maxVersion);
    }
}
