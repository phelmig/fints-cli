import { HISPA } from '../segments/HISPA.js';
import { HKSPA } from '../segments/HKSPA.js';
import { CustomerOrderInteraction } from './customerInteraction.js';
export class SepaAccountInteraction extends CustomerOrderInteraction {
    accounts;
    maxEntries;
    constructor(accounts, // optional specific account numbers
    maxEntries) {
        super(HKSPA.Id, HISPA.Id);
        this.accounts = accounts;
        this.maxEntries = maxEntries;
    }
    createSegments(init) {
        if (!init.isTransactionSupported(this.segId)) {
            throw Error(`Business transaction '${this.segId}' is not supported by this bank`);
        }
        const version = init.getMaxSupportedTransactionVersion(HKSPA.Id);
        if (!version) {
            throw Error(`There is no supported version for business transaction '${HKSPA.Id}'`);
        }
        const accounts = this.accounts?.map((accountNumber) => {
            return init.getBankAccount(accountNumber);
        });
        const hkspa = {
            header: { segId: HKSPA.Id, segNr: 0, version: version },
            accounts: accounts,
            maxEntries: this.maxEntries,
        };
        return [hkspa];
    }
    handleResponse(response, clientResponse) {
        const hispa = response.findSegment(HISPA.Id);
        if (hispa) {
            clientResponse.sepaAccounts = hispa.sepaAccounts || [];
            this.dialog?.config.bankingInformation.upd?.bankAccounts.forEach((bankAccount) => {
                bankAccount.isSepaAccount = false;
            });
            clientResponse.sepaAccounts.forEach((sepaAccount) => {
                const bankAccount = this.dialog?.config.getBankAccount(sepaAccount.accountNumber);
                if (bankAccount && !bankAccount.isSepaAccount) {
                    bankAccount.isSepaAccount = sepaAccount.isSepaAccount;
                    bankAccount.iban = sepaAccount.iban;
                    bankAccount.bic = sepaAccount.bic;
                }
            });
        }
    }
}
