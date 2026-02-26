import { DataElement } from './DataElement.js';
export declare class AlphaNumeric extends DataElement {
    maxLength?: number | undefined;
    constructor(name: string, minCount?: number, maxCount?: number, maxLength?: number | undefined, minVersion?: number, maxVersion?: number);
    encode(value: string): string;
    decode(text: string): string;
}
//# sourceMappingURL=AlphaNumeric.d.ts.map