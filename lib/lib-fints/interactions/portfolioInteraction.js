import { Mt535Parser } from '../mt535parser.js';
import { HIWPD } from '../segments/HIWPD.js';
import { HKWPD } from '../segments/HKWPD.js';
import { CustomerOrderInteraction } from './customerInteraction.js';
/**
 * Interaction for requesting and parsing stock portfolio information (HKWPD/HIWPD)
 */
export class PortfolioInteraction extends CustomerOrderInteraction {
    accountNumber;
    currency;
    priceQuality;
    maxEntries;
    paginationMarker;
    constructor(accountNumber, currency, priceQuality, maxEntries, paginationMarker) {
        super(HKWPD.Id, HIWPD.Id);
        this.accountNumber = accountNumber;
        this.currency = currency;
        this.priceQuality = priceQuality;
        this.maxEntries = maxEntries;
        this.paginationMarker = paginationMarker;
    }
    createSegments(config) {
        const bankAccount = config.getBankAccount(this.accountNumber);
        if (!config.isAccountTransactionSupported(this.accountNumber, this.segId)) {
            throw Error(`Account ${this.accountNumber} does not support business transaction '${this.segId}'`);
        }
        const depotAccount = { ...bankAccount, iban: undefined }; // HKWPD uses KTV which doesn't have IBAN
        const version = config.getMaxSupportedTransactionVersion(HKWPD.Id);
        if (!version) {
            throw Error(`There is no supported version for business transaction '${HKWPD.Id}'`);
        }
        const hkwpd = {
            header: { segId: HKWPD.Id, segNr: 0, version: version },
            depot: depotAccount,
            currency: this.currency,
            priceQuality: this.priceQuality,
            maxEntries: this.maxEntries,
            paginationMarker: this.paginationMarker,
        };
        return [hkwpd];
    }
    handleResponse(response, clientResponse) {
        const hiwpdSegment = response.findSegment(HIWPD.Id);
        if (hiwpdSegment?.portfolioStatement) {
            try {
                // Parse the MT535 data
                const parser = new Mt535Parser(hiwpdSegment.portfolioStatement);
                clientResponse.portfolioStatement = parser.parse();
            }
            catch (error) {
                console.warn('Failed to parse MT535 portfolio statement:', error);
                // Fallback: provide raw data if parsing fails
                clientResponse.rawMT535Data = hiwpdSegment.portfolioStatement;
            }
        }
    }
}
