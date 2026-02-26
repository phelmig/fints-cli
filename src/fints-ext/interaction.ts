import { CustomerOrderInteraction } from '../../lib/lib-fints/interactions/customerInteraction.js';
import type { FinTSConfig } from '../../lib/lib-fints/config.js';
import type { Message } from '../../lib/lib-fints/message.js';
import type { ClientResponse } from '../../lib/lib-fints/types/interactions/customerInteraction.js';
import { HKCCS } from './segments/HKCCS.js';
import { HICCS } from './segments/HICCS.js';

export interface CreditTransferResponse extends ClientResponse {
  jobReference?: string;
}

export class CreditTransferInteraction extends CustomerOrderInteraction {
  private accountNumber: string;
  private sepaDescriptor: string;
  private painXml: string;

  constructor(accountNumber: string, sepaDescriptor: string, painXml: string) {
    super(HKCCS.Id, HICCS.Id);
    this.accountNumber = accountNumber;
    this.sepaDescriptor = sepaDescriptor;
    this.painXml = painXml;
  }

  createSegments(config: FinTSConfig): any[] {
    const bankAccount = config.getBankAccount(this.accountNumber);

    const hkccs = {
      header: { segId: HKCCS.Id, segNr: 0, version: HKCCS.Version },
      account: bankAccount,
      sepaDescriptor: this.sepaDescriptor,
      painMessage: this.painXml,
    };

    return [hkccs];
  }

  handleResponse(response: Message, clientResponse: CreditTransferResponse): void {
    const hiccs = response.findSegment(HICCS.Id);
    if (hiccs) {
      clientResponse.jobReference = (hiccs as any).jobReference;
    }
  }
}
