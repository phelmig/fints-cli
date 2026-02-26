import { Identification } from '../dataElements/Identification.js';
import { Numeric } from '../dataElements/Numeric.js';
import { DataGroup } from './DataGroup.js';
export class RefMessageGroup extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [new Identification('dialogId', 1, 1), new Numeric('msgNr', 1, 1, 4)], minCount, maxCount, minVersion, maxVersion);
    }
}
