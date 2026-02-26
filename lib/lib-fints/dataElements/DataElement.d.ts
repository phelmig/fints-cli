export declare abstract class DataElement {
    name: string;
    minCount: number;
    maxCount: number;
    minVersion?: number | undefined;
    maxVersion?: number | undefined;
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number | undefined, maxVersion?: number | undefined);
    abstract encode(value: unknown, context: string[], version: number): string;
    abstract decode(text: string, version: number): unknown | unknown[] | Record<string, unknown>;
    maxValueCount(version: number): number;
    isInVersion(version: number): boolean;
    toString(value: unknown): string;
}
//# sourceMappingURL=DataElement.d.ts.map