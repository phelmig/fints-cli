import type { AccountBalance } from '../accountBalance.js';
import type { FinTSConfig } from '../config.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerOrderInteraction } from './customerInteraction.js';
export interface AccountBalanceResponse extends ClientResponse {
    balance?: AccountBalance;
}
export declare class BalanceInteraction extends CustomerOrderInteraction {
    accountNumber: string;
    constructor(accountNumber: string);
    createSegments(init: FinTSConfig): Segment[];
    handleResponse(response: Message, clientResponse: AccountBalanceResponse): void;
}
//# sourceMappingURL=balanceInteraction.d.ts.map