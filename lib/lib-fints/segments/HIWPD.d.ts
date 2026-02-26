import { Binary } from '../dataElements/Binary.js';
import { SegmentDefinition } from '../segmentDefinition.js';
import type { SegmentHeader } from '../segmentHeader.js';
export type HIWPDSegment = {
    header: SegmentHeader;
    /**
     * Portfolio statement in S.W.I.F.T. format MT 535 or 571
     */
    portfolioStatement: string;
};
/**
 * Geschäftsvorfälle: C.4.3.1 Kreditinstitutsrückmeldung
 * Version: 6
 */
export declare class HIWPD extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: Binary[];
}
//# sourceMappingURL=HIWPD.d.ts.map