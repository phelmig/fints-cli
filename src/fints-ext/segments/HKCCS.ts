import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { AlphaNumeric } from '../../../lib/lib-fints/dataElements/AlphaNumeric.js';
import { Binary } from '../../../lib/lib-fints/dataElements/Binary.js';
import { SepaAccountGroup } from '../../../lib/lib-fints/dataGroups/SepaAccount.js';

export class HKCCS extends SegmentDefinition {
  static Id = 'HKCCS';
  static Version = 1;

  constructor() {
    super(HKCCS.Id);
  }

  version = HKCCS.Version;

  elements = [
    new SepaAccountGroup('account', 1, 1),
    new AlphaNumeric('sepaDescriptor', 1, 1, 256),
    new Binary('painMessage', 1, 1, 10000),
  ];
}
