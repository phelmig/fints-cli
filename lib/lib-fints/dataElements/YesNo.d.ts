import { DataElement } from './DataElement.js';
export declare class YesNo extends DataElement {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
    encode(value: boolean): string;
    decode(text: string): text is "J";
}
//# sourceMappingURL=YesNo.d.ts.map