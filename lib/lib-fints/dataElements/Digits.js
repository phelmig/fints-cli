import { DataElement } from './DataElement.js';
export class Digits extends DataElement {
    digits;
    constructor(name, minCount = 0, maxCount = 1, digits, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
        this.digits = digits;
    }
    encode(value) {
        if (this.digits < 1) {
            throw Error('the number of digits in a Digits value must be greatet than zero');
        }
        if (!Number.isInteger(value) || value < 0) {
            throw Error(`the Digits value '${this.name}' must be a positive integer`);
        }
        if (String(value).length > this.digits) {
            throw Error(`the Digits value '${this.name}' must fit into the given number of digits`);
        }
        return value.toString().padStart(this.digits, '0');
    }
    decode(text) {
        return Number.parseInt(text, 10);
    }
}
