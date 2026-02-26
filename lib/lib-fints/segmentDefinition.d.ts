import type { DataElement } from './dataElements/DataElement.js';
import type { Segment } from './segment.js';
import { SegmentHeaderGroup } from './segmentHeader.js';
export declare abstract class SegmentDefinition {
    id: string;
    constructor(id: string);
    abstract version: number;
    static header: SegmentHeaderGroup;
    abstract elements: DataElement[];
    getElementsForVersion(version: number): DataElement[];
    encode(data: Segment): string;
}
//# sourceMappingURL=segmentDefinition.d.ts.map