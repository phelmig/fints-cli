import { DataElement } from './DataElement.js';
export class YesNo extends DataElement {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
    }
    encode(value) {
        if (value === undefined || value === null) {
            return '';
        }
        return value ? 'J' : 'N';
    }
    decode(text) {
        if (text !== 'J' && text !== 'N') {
            throw Error(`the YesNo value '${this.name}' must be the character J or N`);
        }
        return text === 'J';
    }
}
