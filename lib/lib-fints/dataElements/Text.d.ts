import { DataElement } from './DataElement.js';
export declare class Text extends DataElement {
    maxLength?: number | undefined;
    constructor(name: string, minCount?: number, maxCount?: number, maxLength?: number | undefined, minVersion?: number, maxVersion?: number);
    encode(value: string): string;
    decode(text: string): string;
}
//# sourceMappingURL=Text.d.ts.map