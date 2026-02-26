import { DataElement } from './DataElement.js';
export class Float extends DataElement {
    maxLength;
    constructor(name, minCount = 0, maxCount = 1, maxLength, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
        this.maxLength = maxLength;
    }
    encode(value) {
        if (value < 0) {
            throw Error(`the Float value '${this.name}' must be positive`);
        }
        if (this.maxLength && value.toString().length > this.maxLength) {
            throw Error(`the Float value '${this.name}' must not exceed its maximum length`);
        }
        const text = value.toString().replace('.', ',');
        return text.indexOf(',') >= 0 ? text : `${text},`;
    }
    decode(text) {
        return Number.parseFloat(text.replace(',', '.'));
    }
}
