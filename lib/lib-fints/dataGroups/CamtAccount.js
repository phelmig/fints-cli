import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { DataGroup } from './DataGroup.js';
export class CamtAccountGroup extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [new AlphaNumeric('iban', 0, 1, 34), new AlphaNumeric('bic', 0, 1, 11)], minCount, maxCount, minVersion, maxVersion);
    }
}
