import { Numeric } from '../dataElements/Numeric.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Synchonisation
 */
export class HKSYN extends SegmentDefinition {
    static Id = 'HKSYN';
    static Version = 3;
    constructor() {
        super(HKSYN.Id);
    }
    version = HKSYN.Version;
    elements = [new Numeric('mode', 1, 1, 1)];
}
