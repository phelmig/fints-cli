import type { Language } from '../codes.js';
import { Numeric } from '../dataElements/Numeric.js';
import type { Bank } from '../dataGroups/Account.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HIKOMSegment = Segment & {
    bankIdentification: Bank;
    defaultLanguage: Language;
    comParams: ComParams;
};
export type ComParams = {
    service: number;
    address: string;
    addressExt?: string;
    filter?: string;
    filterVer?: string;
};
/**
 *
 */
export declare class HIKOM extends SegmentDefinition {
    static Id: string;
    version: number;
    constructor();
    elements: (DataGroup | Numeric)[];
}
//# sourceMappingURL=HIKOM.d.ts.map