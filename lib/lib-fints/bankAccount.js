export var AccountType;
(function (AccountType) {
    AccountType["CheckingAccount"] = "CheckingAccount";
    AccountType["SavingsAccount"] = "SavingsAccount";
    AccountType["FixedDepositAccount"] = "FixedDepositAccount";
    AccountType["SecuritiesAccount"] = "SecuritiesAccount";
    AccountType["LoanMortgageAccount"] = "LoanMortgageAccount";
    AccountType["CreditCardAccount"] = "CreditCardAccount";
    AccountType["InvestmentCompanyFund"] = "InvestmentCompanyFund";
    AccountType["HomeSavingsContract"] = "HomeSavingsContract";
    AccountType["InsurancePolicy"] = "InsurancePolicy";
    AccountType["Miscellaneous"] = "Miscellaneous";
})(AccountType || (AccountType = {}));
export function finTsAccountTypeToEnum(accountType) {
    if (accountType >= 1 && accountType <= 9)
        return AccountType.CheckingAccount;
    if (accountType >= 10 && accountType <= 19)
        return AccountType.SavingsAccount;
    if (accountType >= 20 && accountType <= 29)
        return AccountType.FixedDepositAccount;
    if (accountType >= 30 && accountType <= 39)
        return AccountType.SecuritiesAccount;
    if (accountType >= 40 && accountType <= 49)
        return AccountType.LoanMortgageAccount;
    if (accountType >= 50 && accountType <= 59)
        return AccountType.CreditCardAccount;
    if (accountType >= 60 && accountType <= 69)
        return AccountType.InvestmentCompanyFund;
    if (accountType >= 70 && accountType <= 79)
        return AccountType.HomeSavingsContract;
    if (accountType >= 80 && accountType <= 89)
        return AccountType.InsurancePolicy;
    return AccountType.Miscellaneous;
}
