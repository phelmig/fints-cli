import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { AlphaNumeric } from '../../../lib/lib-fints/dataElements/AlphaNumeric.js';
import { Binary } from '../../../lib/lib-fints/dataElements/Binary.js';
import { Numeric } from '../../../lib/lib-fints/dataElements/Numeric.js';
import { DataGroup } from '../../../lib/lib-fints/dataGroups/DataGroup.js';

export class HKVPP extends SegmentDefinition {
  static Id = 'HKVPP';
  static Version = 1;

  constructor() {
    super(HKVPP.Id);
  }

  version = HKVPP.Version;

  elements = [
    new DataGroup('supportedReports', [
      new AlphaNumeric('psrd', 1, 99, 256),
    ], 1, 1),
    new Binary('pollingId', 0, 1, 4096),
    new Numeric('maxQueries', 0, 1, 4),
    new AlphaNumeric('aufsetzpunkt', 0, 1, 35),
  ];
}
