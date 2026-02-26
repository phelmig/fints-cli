import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Text } from '../dataElements/Text.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Information to the customer of the bank
 */
export class HIKIM extends SegmentDefinition {
    static Id = 'HIKIM';
    version = 2;
    constructor() {
        super(HIKIM.Id);
    }
    elements = [new AlphaNumeric('subject', 1, 1, 35), new Text('text', 1, 1, 2048)];
}
