import type { FinTSConfig } from '../config.js';
import type { SepaAccount } from '../dataGroups/SepaAccount.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerOrderInteraction } from './customerInteraction.js';
export interface SepaAccountResponse extends ClientResponse {
    sepaAccounts?: SepaAccount[];
}
export declare class SepaAccountInteraction extends CustomerOrderInteraction {
    accounts?: string[] | undefined;
    maxEntries?: number | undefined;
    constructor(accounts?: string[] | undefined, // optional specific account numbers
    maxEntries?: number | undefined);
    createSegments(init: FinTSConfig): Segment[];
    handleResponse(response: Message, clientResponse: SepaAccountResponse): void;
}
//# sourceMappingURL=sepaAccountInteraction.d.ts.map