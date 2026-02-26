import { Dat } from '../dataElements/Dat.js';
import { Time } from '../dataElements/Time.js';
import { DataGroup } from './DataGroup.js';
export class TimeStampGroup extends DataGroup {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, [new Dat('date', 1, 1), new Time('time', 0, 1)], minCount, maxCount, minVersion, maxVersion);
    }
}
