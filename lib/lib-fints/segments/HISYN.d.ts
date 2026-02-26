import { Identification } from '../dataElements/Identification.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HISYNSegment = Segment & {
    systemId?: string;
    msgNr?: number;
    secRefNrKey?: number;
    secRefNrSignature?: number;
};
/**
 * Synchonisation response
 */
export declare class HISYN extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (Identification | Numeric)[];
}
//# sourceMappingURL=HISYN.d.ts.map