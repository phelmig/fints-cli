import { Text } from './dataElements/Text.js';
import { SegmentDefinition } from './segmentDefinition.js';
export class PARTED extends SegmentDefinition {
    static Id = 'PARTED';
    constructor() {
        super(PARTED.Id);
    }
    version = 1;
    elements = [new Text('rawData', 0, 1)];
}
export const PartedId = PARTED.Id;
