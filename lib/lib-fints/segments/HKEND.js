import { Identification } from '../dataElements/Identification.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Dialog end
 */
export class HKEND extends SegmentDefinition {
    static Id = 'HKEND';
    static Version = 1;
    constructor() {
        super(HKEND.Id);
    }
    version = HKEND.Version;
    elements = [new Identification('dialogId', 1, 1)];
}
