import { DataGroup } from './dataGroups/DataGroup.js';
export type SegmentHeader = {
    segId: string;
    segNr: number;
    version: number;
    refSegNr?: number;
};
export declare class SegmentHeaderGroup extends DataGroup {
    constructor();
}
//# sourceMappingURL=segmentHeader.d.ts.map