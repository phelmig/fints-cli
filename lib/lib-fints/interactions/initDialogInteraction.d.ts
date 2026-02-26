import type { BankingInformation } from '../bankingInformation.js';
import type { FinTSConfig } from '../config.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerInteraction } from './customerInteraction.js';
export interface InitResponse extends ClientResponse {
    bankingInformation?: BankingInformation;
}
export declare class InitDialogInteraction extends CustomerInteraction {
    config: FinTSConfig;
    syncSystemId: boolean;
    constructor(config: FinTSConfig, syncSystemId?: boolean);
    createSegments(init: FinTSConfig): Segment[];
    handleResponse(response: Message, clientResponse: InitResponse): void;
}
//# sourceMappingURL=initDialogInteraction.d.ts.map