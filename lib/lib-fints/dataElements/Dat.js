import { DataElement } from './DataElement.js';
export class Dat extends DataElement {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
    }
    encode(value) {
        if (!value) {
            return '';
        }
        return value.toISOString().substring(0, 10).replaceAll('-', '');
    }
    decode(text) {
        return new Date(`${text.substring(0, 4)}-${text.substring(4, 6)}-${text.substring(6)}`);
    }
    toString(value) {
        return super.toString(value?.toDateString());
    }
}
