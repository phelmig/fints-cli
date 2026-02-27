import { CustomerOrderInteraction } from '../../lib/lib-fints/interactions/customerInteraction.js';
import type { FinTSConfig } from '../../lib/lib-fints/config.js';
import type { Message } from '../../lib/lib-fints/message.js';
import type { CreditTransferResponse } from './interaction.js';
import { HKIPZ } from './segments/HKIPZ.js';
import { HIIPZ } from './segments/HIIPZ.js';
import { HKVPP } from './segments/HKVPP.js';
import { extractVopFromResponse, executeVopFlow } from './vopFlow.js';

const VOP_DESCRIPTOR = 'urn:iso:std:iso:20022:tech:xsd:pain.002.001.10';

export class InstantPaymentInteraction extends CustomerOrderInteraction {
  private accountNumber: string;
  private sepaDescriptor: string;
  private painXml: string;

  constructor(
    accountNumber: string,
    sepaDescriptor: string,
    painXml: string,
  ) {
    super(HKIPZ.Id, HIIPZ.Id);
    this.accountNumber = accountNumber;
    this.sepaDescriptor = sepaDescriptor;
    this.painXml = painXml;
  }

  createSegments(config: FinTSConfig): any[] {
    const bankAccount = config.getBankAccount(this.accountNumber);

    const hkipz = {
      header: { segId: HKIPZ.Id, segNr: 0, version: HKIPZ.Version },
      account: {
        iban: bankAccount.iban,
        bic: bankAccount.bic,
        accountNumber: bankAccount.accountNumber,
        subAccountId: bankAccount.subAccountId,
        bank: bankAccount.bank,
      },
      sepaDescriptor: this.sepaDescriptor,
      painMessage: this.painXml,
    };

    const hkvpp = {
      header: { segId: HKVPP.Id, segNr: 0, version: HKVPP.Version },
      supportedReports: [VOP_DESCRIPTOR],
    };

    return [hkipz, hkvpp];
  }

  handleClientResponse(response: Message): any {
    const baseResponse = (this as any).handleBaseResponse(response);

    const { needsVop, hivpp, scrollRef } = extractVopFromResponse(response, baseResponse.bankAnswers || []);
    if (needsVop) {
      baseResponse._needsVop = true;
      baseResponse._hivpp = hivpp;
      baseResponse._scrollRef = scrollRef;
      baseResponse.success = true;
      baseResponse.requiresTan = true;
      baseResponse.tanReference = '__vop_pending__';
      baseResponse.tanChallenge = 'VoP verification in progress...';
    }

    if (!needsVop && baseResponse.success && !baseResponse.requiresTan) {
      this.handleResponse(response, baseResponse);
    }

    const currentBankingInfoSnapshot = JSON.stringify((this as any).dialog?.config?.bankingInformation);
    baseResponse.bankingInformationUpdated =
      currentBankingInfoSnapshot !== JSON.stringify((this as any).dialog?.config?.bankingInformation);

    return baseResponse;
  }

  async runVopFlow(dialog: any, config: FinTSConfig, initialHivpp: any, scrollRef?: string): Promise<any> {
    return executeVopFlow({
      dialog,
      config,
      initialHivpp,
      scrollRef,
      vopDescriptor: VOP_DESCRIPTOR,
      orderSegId: HKIPZ.Id,
      createResubmissionSegment: () => {
        const bankAccount = config.getBankAccount(this.accountNumber);
        return {
          header: { segId: HKIPZ.Id, segNr: 0, version: HKIPZ.Version },
          account: {
            iban: bankAccount.iban,
            bic: bankAccount.bic,
            accountNumber: bankAccount.accountNumber,
            subAccountId: bankAccount.subAccountId,
            bank: bankAccount.bank,
          },
          sepaDescriptor: this.sepaDescriptor,
          painMessage: this.painXml,
        };
      },
    });
  }

  handleResponse(response: Message, clientResponse: CreditTransferResponse): void {
    const hiipz = response.findSegment(HIIPZ.Id);
    if (hiipz) {
      clientResponse.jobReference = (hiipz as any).jobReference;
    }
  }
}
