import { DataElement } from './DataElement.js';
export class Time extends DataElement {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
    }
    encode(value) {
        if (!value) {
            return '';
        }
        return value.toISOString().substring(11, 19).replaceAll(':', '');
    }
    decode(text) {
        return new Date(`1970-01-01T${text.substring(0, 2)}:${text.substring(2, 4)}:${text.substring(4)}Z`);
    }
    toString(value) {
        return super.toString(value?.toTimeString());
    }
}
