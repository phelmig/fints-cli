import type { BankAnswer } from '../bankAnswer.js';
import type { FinTSConfig } from '../config.js';
import type { Dialog } from '../dialog.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import type { Statement } from '../statement.js';
export interface PhotoTan {
    mimeType: string;
    image: Uint8Array;
}
/**
 * The response from the client after a customer interaction
 * @property dialogId The dialog ID of the current dialog
 * @property success Whether the interaction was successful
 * @property bankingInformationUpdated Whether the banking information were updated
 * @property bankAnswers The answers from the bank
 * @property requiresTan Whether security approval is required to continue the transaction (a user entered TAN or decoupled approval)
 * @property tanReference A reference for the TAN which needs to be provided in the continuation method
 * @property tanChallenge A prompt provided by the bank which should be displayed to the user to enter the TAN
 * @property tanMediaName The name of the TAN media to use for the TAN input
 */
export interface ClientResponse {
    dialogId: string;
    success: boolean;
    bankingInformationUpdated: boolean;
    bankAnswers: BankAnswer[];
    requiresTan: boolean;
    tanReference?: string;
    tanChallenge?: string;
    tanPhoto?: PhotoTan;
    tanMediaName?: string;
}
export interface StatementResponse extends ClientResponse {
    statements: Statement[];
}
export declare abstract class CustomerInteraction {
    segId: string;
    dialog?: Dialog;
    constructor(segId: string);
    getSegments(config: FinTSConfig): Segment[];
    handleClientResponse(message: Message): ClientResponse;
    protected abstract createSegments(config: FinTSConfig): Segment[];
    protected abstract handleResponse(response: Message, clientResponse: ClientResponse): void;
    private parseHHDUC;
    private handleBaseResponse;
}
export declare abstract class CustomerOrderInteraction extends CustomerInteraction {
    responseSegId: string;
    constructor(segId: string, responseSegId: string);
}
//# sourceMappingURL=customerInteraction.d.ts.map