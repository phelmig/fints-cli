import { Binary } from '../dataElements/Binary.js';
import { SegmentDefinition } from '../segmentDefinition.js';
/**
 * Account transactions within period response
 */
export class HIKAZ extends SegmentDefinition {
    static Id = 'HIKAZ';
    version = 7;
    constructor() {
        super(HIKAZ.Id);
    }
    elements = [
        new Binary('bookedTransactions', 1, 1, Number.MAX_SAFE_INTEGER),
        new Binary('notedTransactions', 0, 1, Number.MAX_SAFE_INTEGER),
    ];
}
