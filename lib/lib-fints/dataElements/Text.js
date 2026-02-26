import { finTsDecode, finTsEncode } from '../format.js';
import { DataElement } from './DataElement.js';
export class Text extends DataElement {
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
            throw Error('a Text value must not exceed its maximum length');
        }
        return finTsEncode(value.trim());
    }
    decode(text) {
        return finTsDecode(text);
    }
}
