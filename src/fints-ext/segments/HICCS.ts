import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { AlphaNumeric } from '../../../lib/lib-fints/dataElements/AlphaNumeric.js';

export class HICCS extends SegmentDefinition {
  static Id = 'HICCS';
  static Version = 1;

  constructor() {
    super(HICCS.Id);
  }

  version = HICCS.Version;

  elements = [
    new AlphaNumeric('jobReference', 0, 1, 99),
  ];
}
