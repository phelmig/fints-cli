import { Binary } from '../dataElements/Binary.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Geschäftsvorfälle: C.4.3.1 Kreditinstitutsrückmeldung
 * Version: 6
 */
export class HIWPD extends SegmentDefinition {
    static Id = 'HIWPD';
    static Version = 6;
    constructor() {
        super(HIWPD.Id);
    }
    version = HIWPD.Version;
    elements = [new Binary('portfolioStatement', 1, 1)];
}
