import { Binary } from '../dataElements/Binary.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Encrypted data
 */
export class HNVSD extends SegmentDefinition {
    static Id = 'HNVSD';
    static Version = 1;
    constructor() {
        super(HNVSD.Id);
    }
    version = 1;
    elements = [new Binary('encryptedData', 1, 1)];
}
