import type { FinTSConfig } from '../config.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerInteraction } from './customerInteraction.js';
export interface TanMediaResponse extends ClientResponse {
    tanMediaList: string[];
}
export declare class EndDialogInteraction extends CustomerInteraction {
    constructor();
    createSegments(_config: FinTSConfig): Segment[];
    handleResponse(_response: Message, _clientResponse: ClientResponse): void;
}
//# sourceMappingURL=endDialogInteraction.d.ts.map