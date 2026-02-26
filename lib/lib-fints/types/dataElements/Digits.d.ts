import { DataElement } from './DataElement.js';
export declare class Digits extends DataElement {
    digits: number;
    constructor(name: string, minCount: number | undefined, maxCount: number | undefined, digits: number, minVersion?: number, maxVersion?: number);
    encode(value: number): string;
    decode(text: string): number;
}
//# sourceMappingURL=Digits.d.ts.map