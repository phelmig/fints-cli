import { encodeElements } from './encoder.js';
import { SegmentHeaderGroup } from './segmentHeader.js';
export class SegmentDefinition {
    id;
    constructor(id) {
        this.id = id;
    }
    static header = new SegmentHeaderGroup();
    getElementsForVersion(version) {
        return this.elements.filter((element) => version >= (element.minVersion ?? 0) &&
            version <= (element.maxVersion ?? Number.MAX_SAFE_INTEGER));
    }
    encode(data) {
        const headerText = SegmentDefinition.header.encode(data.header, [data.header.segId], data.header.version);
        const elementsText = encodeElements(data, this.elements, '+', data.header.version, [
            data.header.segId,
        ]);
        return `${headerText}+${elementsText}'`;
    }
}
