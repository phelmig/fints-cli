import { DataElement } from './DataElement.js';
export class Binary extends DataElement {
    maxLength;
    constructor(name, minCount = 0, maxCount = 1, maxLength, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
        this.maxLength = maxLength;
    }
    encode(value) {
        if (!value) {
            return '';
        }
        if (this.maxLength && value.length > this.maxLength) {
            throw Error(`the Binary value '${this.name}' must not exceed its maximum length`);
        }
        return `@${value.length}@${value}`;
    }
    decode(text) {
        return text.slice(text.indexOf('@', 1) + 1);
    }
}
