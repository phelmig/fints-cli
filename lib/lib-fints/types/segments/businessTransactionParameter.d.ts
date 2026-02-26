import type { DataElement } from '../dataElements/DataElement.js';
import type { Segment } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type BusinessTransactionParameterSegment<TParams> = Segment & {
    maxTransactions: number;
    minSignatures: number;
    securityClass?: number;
    params: TParams;
};
/**
 * Base class for business transaction parameter segments
 */
export declare abstract class BusinessTransactionParameter extends SegmentDefinition {
    paramElements: DataElement[];
    elements: DataElement[];
    constructor(id: string, paramElements: DataElement[], secClassMinVersion?: number);
}
//# sourceMappingURL=businessTransactionParameter.d.ts.map