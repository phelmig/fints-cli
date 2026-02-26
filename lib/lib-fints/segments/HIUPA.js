import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Identification } from '../dataElements/Identification.js';
import { Numeric } from '../dataElements/Numeric.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * User parameters general
 */
export class HIUPA extends SegmentDefinition {
    static Id = 'HIUPA';
    version = 4;
    constructor() {
        super(HIUPA.Id);
    }
    elements = [
        new Identification('internalUserId', 1, 1),
        new Numeric('updVersion', 1, 1, 3),
        new Numeric('updUsage', 1, 1, 1),
        new AlphaNumeric('userName', 0, 1, 35),
        new AlphaNumeric('extension', 0, 1, 2048),
    ];
}
