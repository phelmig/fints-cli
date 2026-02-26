import { AlphaNumeric } from './AlphaNumeric.js';
export class Identification extends AlphaNumeric {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, 30, minVersion, maxVersion);
    }
}
