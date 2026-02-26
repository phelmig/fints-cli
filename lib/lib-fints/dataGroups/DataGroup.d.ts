import { DataElement } from '../dataElements/DataElement.js';
export declare class DataGroup extends DataElement {
    elements: DataElement[];
    constructor(name: string, elements: DataElement[], minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
    maxValueCount(version: number): number;
    encode(values: unknown[] | Record<string, unknown>, context: string[], version: number): string;
    decode(text: string, version: number): unknown[] | Record<string, unknown> | undefined;
    toString(values: unknown[] | Record<string, unknown> | undefined): string;
}
//# sourceMappingURL=DataGroup.d.ts.map