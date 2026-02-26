import { Numeric } from '../dataElements/Numeric.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Base class for business transaction parameter segments
 */
export class BusinessTransactionParameter extends SegmentDefinition {
    paramElements;
    elements;
    constructor(id, paramElements, secClassMinVersion = 1) {
        super(id);
        this.paramElements = paramElements;
        this.elements = [
            new Numeric('maxTrans', 1, 1, 3),
            new Numeric('minSigs', 1, 1, 1),
            new Numeric('secClass', 1, 1, 1, secClassMinVersion),
            new DataGroup('params', paramElements, 1, 1),
        ];
    }
}
