import type { FinTSConfig } from './config.js';
import { HttpClient } from './httpClient.js';
import { type ClientResponse, type CustomerInteraction } from './interactions/customerInteraction.js';
export declare class Dialog {
    config: FinTSConfig;
    dialogId: string;
    lastMessageNumber: number;
    interactions: CustomerInteraction[];
    responses: Map<string, ClientResponse>;
    currentInteractionIndex: number;
    isInitialized: boolean;
    hasEnded: boolean;
    httpClient: HttpClient;
    constructor(config: FinTSConfig, syncSystemId?: boolean);
    get currentInteraction(): CustomerInteraction;
    start(): Promise<Map<string, ClientResponse>>;
    continue(tanOrderReference: string, tan?: string): Promise<Map<string, ClientResponse>>;
    addCustomerInteraction(interaction: CustomerInteraction, afterCurrent?: boolean): void;
    private createCurrentCustomerMessage;
    private createCurrentTanMessage;
    private handlePartedMessages;
    private checkEnded;
    private getHttpClient;
}
//# sourceMappingURL=dialog.d.ts.map