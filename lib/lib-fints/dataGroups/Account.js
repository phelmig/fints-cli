import { Identification } from '../dataElements/Identification.js';
import { BankIdentification } from './BankIdentification.js';
import { DataGroup } from './DataGroup.js';
export class AccountGroup extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [
            new Identification('accountNumber', 1, 1),
            new Identification('subAccountId', 0, 1),
            new BankIdentification('bank', 1, 1),
        ], minCount, maxCount, minVersion, maxVersion);
    }
}
