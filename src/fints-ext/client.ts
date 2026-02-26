import { FinTSClient } from '../../lib/lib-fints/client.js';
import { registerSegmentDefinition } from '../../lib/lib-fints/segments/registry.js';
import { registerSegments } from '../../lib/lib-fints/segments/registry.js';
import { HKCCS } from './segments/HKCCS.js';
import { HICCS } from './segments/HICCS.js';
import { CreditTransferInteraction, type CreditTransferResponse } from './interaction.js';
import type { FinTSConfig } from '../../lib/lib-fints/config.js';

let initialized = false;

function ensureSegmentsRegistered() {
  if (!initialized) {
    registerSegments();
    registerSegmentDefinition(new HKCCS());
    registerSegmentDefinition(new HICCS());
    initialized = true;
  }
}

export class ExtendedFinTSClient extends FinTSClient {
  constructor(config: FinTSConfig) {
    ensureSegmentsRegistered();
    super(config);
  }

  async initiateCreditTransfer(
    accountNumber: string,
    painXml: string,
    sepaDescriptor: string = 'urn?:iso?:std?:iso?:20022?:tech?:xsd?:pain.001.003.03',
  ): Promise<CreditTransferResponse> {
    const interaction = new CreditTransferInteraction(accountNumber, sepaDescriptor, painXml);
    return (await this.startCustomerOrderInteraction(interaction)) as CreditTransferResponse;
  }

  async initiateCreditTransferWithTan(
    tanReference: string,
    tan?: string,
  ): Promise<CreditTransferResponse> {
    return (await this.continueCustomerInteractionWithTan(
      [HKCCS.Id],
      tanReference,
      tan,
    )) as CreditTransferResponse;
  }
}

export { FinTSConfig } from '../../lib/lib-fints/config.js';
export type { CreditTransferResponse } from './interaction.js';
