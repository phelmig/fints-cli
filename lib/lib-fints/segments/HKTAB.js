import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Numeric } from '../dataElements/Numeric.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Request TAN media
 */
export class HKTAB extends SegmentDefinition {
    static Id = 'HKTAB';
    static Version = 5;
    constructor() {
        super(HKTAB.Id);
    }
    version = HKTAB.Version;
    elements = [new Numeric('mediaType', 1, 1, 1), new AlphaNumeric('mediaClass', 1, 1, 1)];
}
