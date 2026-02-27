import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { AlphaNumeric } from '../../../lib/lib-fints/dataElements/AlphaNumeric.js';
import { Binary } from '../../../lib/lib-fints/dataElements/Binary.js';
import { Numeric } from '../../../lib/lib-fints/dataElements/Numeric.js';

export class HIVPP extends SegmentDefinition {
  static Id = 'HIVPP';
  static Version = 1;

  constructor() {
    super(HIVPP.Id);
  }

  version = HIVPP.Version;

  // Bank wire format (8 data elements):
  // vopId + vopIdValidUntil + pollingId + psrDescriptor + psr + vopResult + matchedName + waitForSeconds
  elements = [
    new Binary('vopId', 0, 1, 4096),
    new AlphaNumeric('vopIdValidUntil', 0, 1, 19),
    new Binary('pollingId', 0, 1, 4096),
    new AlphaNumeric('paymentStatusReportDescriptor', 0, 1, 256),
    new Binary('paymentStatusReport', 0, 1, 65536),
    new AlphaNumeric('vopResult', 0, 1, 4),
    new AlphaNumeric('matchedName', 0, 1, 140),
    new Numeric('waitForSeconds', 0, 1, 1),
  ];
}
