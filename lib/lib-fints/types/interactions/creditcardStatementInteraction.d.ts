import type { AccountBalance } from '../accountBalance.js';
import type { FinTSConfig } from '../config.js';
import type { CreditCardStatement } from '../creditCardStatement.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerOrderInteraction } from './customerInteraction.js';
export interface CreditCardStatementResponse extends ClientResponse {
    balance: AccountBalance;
    statements: CreditCardStatement[];
}
export declare class CreditCardStatementInteraction extends CustomerOrderInteraction {
    accountNumber: string;
    from?: Date | undefined;
    constructor(accountNumber: string, from?: Date | undefined);
    createSegments(init: FinTSConfig): Segment[];
    handleResponse(response: Message, clientResponse: CreditCardStatementResponse): void;
}
//# sourceMappingURL=creditcardStatementInteraction.d.ts.map