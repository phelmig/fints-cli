import { Text } from './dataElements/Text.js';
import { SegmentDefinition } from './segmentDefinition.js';
export class UNKNOW extends SegmentDefinition {
    static Id = 'UNKNOW';
    constructor() {
        super(UNKNOW.Id);
    }
    version = 1;
    elements = [new Text('rawData', 0, 1)];
}
export const UnkownId = UNKNOW.Id;
