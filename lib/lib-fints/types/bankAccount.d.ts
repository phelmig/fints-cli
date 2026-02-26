import type { SepaAccount } from './dataGroups/SepaAccount.js';
import type { AccountLimit, AllowedTransactions } from './segments/HIUPD.js';
export declare enum AccountType {
    CheckingAccount = "CheckingAccount",
    SavingsAccount = "SavingsAccount",
    FixedDepositAccount = "FixedDepositAccount",
    SecuritiesAccount = "SecuritiesAccount",
    LoanMortgageAccount = "LoanMortgageAccount",
    CreditCardAccount = "CreditCardAccount",
    InvestmentCompanyFund = "InvestmentCompanyFund",
    HomeSavingsContract = "HomeSavingsContract",
    InsurancePolicy = "InsurancePolicy",
    Miscellaneous = "Miscellaneous"
}
export type BankAccount = SepaAccount & {
    customerId: string;
    accountType: AccountType;
    currency: string;
    holder1: string;
    holder2?: string;
    product?: string;
    limit?: AccountLimit;
    allowedTransactions?: AllowedTransactions[];
};
export declare function finTsAccountTypeToEnum(accountType: number): AccountType;
//# sourceMappingURL=bankAccount.d.ts.map