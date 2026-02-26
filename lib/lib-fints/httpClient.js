import { Message } from './message.js';
export class HttpClient {
    url;
    debug;
    debugRaw;
    constructor(url, debug = false, debugRaw = false) {
        this.url = url;
        this.debug = debug;
        this.debugRaw = debugRaw;
    }
    async sendMessage(message) {
        const encodedMessage = message.encode();
        const requestBuffer = Buffer.from(encodedMessage);
        if (this.debug) {
            console.log('Request Message:\n');
            if (this.debugRaw) {
                console.log(encodedMessage.split("'").join('\n'));
            }
            else {
                console.log(message.toString());
            }
        }
        const response = await fetch(this.url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: requestBuffer.toString('base64'),
        });
        if (response.ok) {
            const responseBuffer = Buffer.from(await response.text(), 'base64');
            const responseText = responseBuffer.toString('latin1');
            try {
                const customerOrderMessage = message;
                const responseMessage = Message.decode(responseText, customerOrderMessage.supportsPartedResponseSegments
                    ? customerOrderMessage.orderResponseSegId
                    : undefined);
                if (this.debug) {
                    console.log('Response Message:\n');
                    if (this.debugRaw) {
                        console.log(responseText.split("'").join('\n'));
                    }
                    else {
                        console.log(`Response Message:\n${responseMessage.toString(true)}\n`);
                    }
                }
                return responseMessage;
            }
            catch (error) {
                console.error('Error decoding response message:', error);
                console.error('Response Message Content:\n', responseText.split("'").join('\n'));
                throw error;
            }
        }
        else {
            throw Error(`Request failed with status code ${response.status}: ${await response.text()}`);
        }
    }
}
