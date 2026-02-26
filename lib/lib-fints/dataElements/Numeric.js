import { DataElement } from './DataElement.js';
export class Numeric extends DataElement {
    maxLength;
    constructor(name, minCount = 0, maxCount = 1, maxLength, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
        this.maxLength = maxLength;
    }
    encode(value) {
        if (value === undefined || value === null) {
            return '';
        }
        if (!Number.isInteger(value) || value < 0) {
            throw Error(`the Numeric value '${this.name}' must be a positive integer`);
        }
        if (this.maxLength && value.toString().length > this.maxLength) {
            throw Error(`the Numeric value '${this.name}' must not exceed its maximum length`);
        }
        return value.toString();
    }
    decode(text) {
        return Number.parseInt(text, 10);
    }
    static decode(text) {
        return Number.parseInt(text, 10);
    }
}
