import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { AlphaNumeric } from '../../../lib/lib-fints/dataElements/AlphaNumeric.js';

export class HIIPZ extends SegmentDefinition {
  static Id = 'HIIPZ';
  static Version = 1;

  constructor() {
    super(HIIPZ.Id);
  }

  version = HIIPZ.Version;

  elements = [
    new AlphaNumeric('jobReference', 0, 1, 99),
  ];
}
