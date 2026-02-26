import { DataElement } from './DataElement.js';
export declare class Numeric extends DataElement {
    maxLength?: number | undefined;
    constructor(name: string, minCount?: number, maxCount?: number, maxLength?: number | undefined, minVersion?: number, maxVersion?: number);
    encode(value: number): string;
    decode(text: string): number;
    static decode(text: string): number;
}
//# sourceMappingURL=Numeric.d.ts.map