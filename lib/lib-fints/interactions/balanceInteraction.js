import { CreditDebit } from '../codes.js';
import { HISAL } from '../segments/HISAL.js';
import { HKSAL } from '../segments/HKSAL.js';
import { CustomerOrderInteraction } from './customerInteraction.js';
export class BalanceInteraction extends CustomerOrderInteraction {
    accountNumber;
    constructor(accountNumber) {
        super(HKSAL.Id, HISAL.Id);
        this.accountNumber = accountNumber;
    }
    createSegments(init) {
        const bankAccount = init.getBankAccount(this.accountNumber);
        if (!init.isAccountTransactionSupported(this.accountNumber, this.segId)) {
            throw Error(`Account ${this.accountNumber} does not support business transaction '${this.segId}'`);
        }
        const version = init.getMaxSupportedTransactionVersion(HKSAL.Id);
        if (!version) {
            throw Error(`There is no supported version for business transaction '${HKSAL.Id}`);
        }
        const account = version <= 6 ? { ...bankAccount, iban: undefined, bic: undefined } : bankAccount;
        const hksal = {
            header: { segId: HKSAL.Id, segNr: 0, version: version },
            account,
            allAccounts: false,
        };
        return [hksal];
    }
    handleResponse(response, clientResponse) {
        const hisal = response.findSegment(HISAL.Id);
        if (hisal) {
            clientResponse.balance = {
                date: hisal.balance.date,
                currency: hisal.currency,
                balance: balanceToValue(hisal.balance),
                notedBalance: hisal.notedBalance ? balanceToValue(hisal.notedBalance) : undefined,
                creditLimit: hisal.creditLimit?.value,
                availableAmount: hisal.availableAmount?.value,
            };
        }
    }
}
function balanceToValue(balance) {
    return balance.creditDebit === CreditDebit.Credit ? balance.amount.value : -balance.amount.value;
}
