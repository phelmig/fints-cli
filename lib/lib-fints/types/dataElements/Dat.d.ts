import { DataElement } from './DataElement.js';
export declare class Dat extends DataElement {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
    encode(value: Date): string;
    decode(text: string): Date;
    toString(value: Date): string;
}
//# sourceMappingURL=Dat.d.ts.map