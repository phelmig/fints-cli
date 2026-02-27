import { SegmentDefinition } from '../../../lib/lib-fints/segmentDefinition.js';
import { Binary } from '../../../lib/lib-fints/dataElements/Binary.js';

export class HKVPA extends SegmentDefinition {
  static Id = 'HKVPA';
  static Version = 1;

  constructor() {
    super(HKVPA.Id);
  }

  version = HKVPA.Version;

  elements = [
    new Binary('vopId', 0, 1, 4096),
  ];
}
