import { type CustomerMessage, Message } from './message.js';
export declare class HttpClient {
    url: string;
    debug: boolean;
    debugRaw: boolean;
    constructor(url: string, debug?: boolean, debugRaw?: boolean);
    sendMessage(message: CustomerMessage): Promise<Message>;
}
//# sourceMappingURL=httpClient.d.ts.map