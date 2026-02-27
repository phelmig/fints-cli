import { FinTSClient } from '../../lib/lib-fints/client.js';
import { registerSegmentDefinition } from '../../lib/lib-fints/segments/registry.js';
import { registerSegments } from '../../lib/lib-fints/segments/registry.js';
import { HKCCS } from './segments/HKCCS.js';
import { HICCS } from './segments/HICCS.js';
import { HKIPZ } from './segments/HKIPZ.js';
import { HIIPZ } from './segments/HIIPZ.js';
import { HKVPP } from './segments/HKVPP.js';
import { HIVPP } from './segments/HIVPP.js';
import { HKVPA } from './segments/HKVPA.js';
import { CreditTransferInteraction, type CreditTransferResponse } from './interaction.js';
import { InstantPaymentInteraction } from './instantPaymentInteraction.js';
import type { FinTSConfig } from '../../lib/lib-fints/config.js';

let initialized = false;

function ensureSegmentsRegistered() {
  if (!initialized) {
    registerSegments();
    registerSegmentDefinition(new HKCCS());
    registerSegmentDefinition(new HICCS());
    registerSegmentDefinition(new HKIPZ());
    registerSegmentDefinition(new HIIPZ());
    registerSegmentDefinition(new HKVPP());
    registerSegmentDefinition(new HIVPP());
    registerSegmentDefinition(new HKVPA());
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
    sepaDescriptor: string = 'sepade:xsd:pain.001.001.09.xsd',
  ): Promise<CreditTransferResponse> {
    const interaction = new CreditTransferInteraction(accountNumber, sepaDescriptor, painXml);
    const response = (await this.startCustomerOrderInteraction(interaction)) as CreditTransferResponse;

    if ((response as any)._needsVop) {
      const dialog = (this as any).currentDialog;
      return (await interaction.runVopFlow(dialog, this.config, (response as any)._hivpp, (response as any)._scrollRef)) as CreditTransferResponse;
    }

    return response;
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

  async initiateInstantPayment(
    accountNumber: string,
    painXml: string,
    sepaDescriptor: string = 'sepade:xsd:pain.001.001.09.xsd',
  ): Promise<CreditTransferResponse> {
    const interaction = new InstantPaymentInteraction(accountNumber, sepaDescriptor, painXml);
    const response = (await this.startCustomerOrderInteraction(interaction)) as CreditTransferResponse;

    if ((response as any)._needsVop) {
      const dialog = (this as any).currentDialog;
      return (await interaction.runVopFlow(dialog, this.config, (response as any)._hivpp, (response as any)._scrollRef)) as CreditTransferResponse;
    }

    return response;
  }

  async initiateInstantPaymentWithTan(
    tanReference: string,
    tan?: string,
  ): Promise<CreditTransferResponse> {
    return (await this.continueCustomerInteractionWithTan(
      [HKIPZ.Id],
      tanReference,
      tan,
    )) as CreditTransferResponse;
  }
}

export { FinTSConfig } from '../../lib/lib-fints/config.js';
export type { CreditTransferResponse } from './interaction.js';
