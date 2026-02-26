import { finTsDecode, finTsEncode } from '../format.js';
import { DataElement } from './DataElement.js';
export class AlphaNumeric extends DataElement {
    maxLength;
    constructor(name, minCount = 0, maxCount = 1, maxLength, minVersion, maxVersion) {
        super(name, minCount, maxCount, minVersion, maxVersion);
        this.maxLength = maxLength;
    }
    encode(value) {
        if (!value) {
            return '';
        }
        if (value.indexOf('\n') >= 0 || value.indexOf('\r') >= 0) {
            throw Error(`the AlphaNumeric value '${this.name}' must not contain CR or LF characters`);
        }
        if (this.maxLength && value.toString().length > this.maxLength) {
            throw Error(`the AlphaNumeric value '${this.name}' must not exceed its maximum length`);
        }
        return finTsEncode(value.trim());
    }
    decode(text) {
        return finTsDecode(text);
    }
}
