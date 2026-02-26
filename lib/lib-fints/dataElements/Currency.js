import { AlphaNumeric } from './AlphaNumeric.js';
export class Currency extends AlphaNumeric {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, 3, minVersion, maxVersion);
    }
}
