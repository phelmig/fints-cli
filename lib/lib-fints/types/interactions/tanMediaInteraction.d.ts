import type { FinTSConfig } from '../config.js';
import type { Message } from '../message.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerOrderInteraction } from './customerInteraction.js';
export interface TanMediaResponse extends ClientResponse {
    tanMediaList: string[];
}
export declare class TanMediaInteraction extends CustomerOrderInteraction {
    constructor();
    createSegments(init: FinTSConfig): Segment[];
    handleResponse(response: Message, clientResponse: TanMediaResponse): void;
}
//# sourceMappingURL=tanMediaInteraction.d.ts.map