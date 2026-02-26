import { Digits } from './Digits.js';
export class Country extends Digits {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, 3, minVersion, maxVersion);
    }
}
