import { CamtParser } from '../camtParser.js';
import { HICAZ } from '../segments/HICAZ.js';
import { HKCAZ } from '../segments/HKCAZ.js';
import { CustomerOrderInteraction } from './customerInteraction.js';
export class StatementInteractionCAMT extends CustomerOrderInteraction {
    accountNumber;
    from;
    to;
    constructor(accountNumber, from, to) {
        super(HKCAZ.Id, HICAZ.Id);
        this.accountNumber = accountNumber;
        this.from = from;
        this.to = to;
    }
    createSegments(init) {
        const bankAccount = init.getBankAccount(this.accountNumber);
        const version = init.getMaxSupportedTransactionVersion(HKCAZ.Id);
        if (!version) {
            throw Error(`There is no supported version for business transaction '${HKCAZ.Id}'`);
        }
        let acceptedCamtFormats = ['urn:iso:std:iso:20022:tech:xsd:camt.052.001.08'];
        const params = init.getTransactionParameters(HKCAZ.Id);
        if (params && params.supportedCamtFormats.length > 0) {
            acceptedCamtFormats = params.supportedCamtFormats.filter((format) => format.startsWith('urn:iso:std:iso:20022:tech:xsd:camt.052.001.'));
        }
        const hkcaz = {
            header: { segId: HKCAZ.Id, segNr: 0, version: version },
            account: bankAccount,
            acceptedCamtFormats: acceptedCamtFormats,
            allAccounts: false,
            from: this.from,
            to: this.to,
        };
        return [hkcaz];
    }
    handleResponse(response, clientResponse) {
        const hicaz = response.findSegment(HICAZ.Id);
        if (hicaz?.bookedTransactions && hicaz.bookedTransactions.length > 0) {
            try {
                // Parse all CAMT messages (one per booking day) and combine statements
                const allStatements = [];
                for (const camtMessage of hicaz.bookedTransactions) {
                    // The regex looks for the XML declaration `<?xml ... ?>`
                    // and checks if it contains the attribute encoding="UTF-8".
                    // The 'i' flag makes the match case-insensitive (e.g., for "utf-8").
                    const isUtf8Encoded = /<\?xml[^>]*encoding="UTF-8"[^>]*\?>/i.test(camtMessage);
                    let xmlString = camtMessage;
                    if (isUtf8Encoded) {
                        // camtMessage is initially encoded as 'latin1' (ISO-8859-1), but actually contains UTF-8 data.
                        // Therefore, we need to first convert it back to a buffer using 'latin1', and then decode it as 'utf8'.
                        const intermediateBuffer = Buffer.from(camtMessage, 'latin1');
                        xmlString = intermediateBuffer.toString('utf8');
                    }
                    const parser = new CamtParser(xmlString);
                    const statements = parser.parse();
                    allStatements.push(...statements);
                }
                clientResponse.statements = allStatements;
            }
            catch (error) {
                console.warn('CAMT parsing failed:', error);
                clientResponse.statements = [];
            }
        }
        else {
            clientResponse.statements = [];
        }
    }
}
