import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { AlphaNumeric } from '../../../lib/lib-fints/dataElements/AlphaNumeric.js';
import { Binary } from '../../../lib/lib-fints/dataElements/Binary.js';
import { InternationalAccountGroup } from '../../../lib/lib-fints/dataGroups/InternationalAccount.js';

export class HKIPZ extends SegmentDefinition {
  static Id = 'HKIPZ';
  static Version = 1;

  constructor() {
    super(HKIPZ.Id);
  }

  version = HKIPZ.Version;

  elements = [
    new InternationalAccountGroup('account', 1, 1),
    new AlphaNumeric('sepaDescriptor', 1, 1, 256),
    new Binary('painMessage', 1, 1, 10000),
  ];
}
