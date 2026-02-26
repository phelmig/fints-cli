import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Digits } from '../dataElements/Digits.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Responses to the message
 */
export class HIRMG extends SegmentDefinition {
    static Id = 'HIRMG';
    static Version = 2;
    constructor() {
        super(HIRMG.Id);
    }
    version = HIRMG.Version;
    elements = [
        new DataGroup('answers', [
            new Digits('code', 1, 1, 4),
            new AlphaNumeric('refElement', 0, 1, 7),
            new AlphaNumeric('text', 1, 1, 80),
            new AlphaNumeric('params', 0, 10, 35),
        ], 1, 99),
    ];
}
