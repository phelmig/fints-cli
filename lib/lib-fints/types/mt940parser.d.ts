import { Balance, Statement, Transaction } from './statement.js';
export { Statement, Transaction, Balance };
export declare enum TokenType {
    Tag = "Tag",
    SubTag = "SubTag",
    PurposeTag = "PurposeTag",
    SingleAlpha = "SingleAlpha",
    StatementNumber = "StatementNumber",
    CustomerReference = "CustomerReference",
    BankReference = "BankReference",
    Date = "Date",
    ShortDate = "ShortDate",
    CreditDebit = "CreditDebit",
    Decimal = "Decimal",
    Currency = "Currency",
    TextToEndOfLine = "TextToEndOfLine",
    TextToNextSubTag = "TextToNextSubTag",
    TextToNextPurposeTag = "TextToNextPurposeTag",
    NextNonTagLine = "NextNonTagLine",
    TransactionType = "TransactionType",
    TransactionCode = "TransactionCode",
    WhiteSpace = "WhiteSpace"
}
export declare class Mt940Parser {
    tokenizer: Mt940Tokenizer;
    statements: Statement[];
    currentStatement: Partial<Statement>;
    currentTransaction: Transaction | undefined;
    constructor(input: string);
    parse(): Statement[];
    parseInfoToAccountOwner(infoToAccountOwner: string): void;
    parsePurpose(transaction: Transaction): void;
    parseBalance(): Balance;
    parseDate(isMandatory?: boolean): Date;
    parseAmount(creditDebit: string, isMandatory?: boolean): number;
}
export declare class Mt940Tokenizer {
    private input;
    position: number;
    lastToken: string;
    constructor(input: string);
    parseNextToken(type: TokenType, isMandatory: boolean): string;
    match(regExp: RegExp): RegExpExecArray | null;
    isAtEnd(): boolean;
}
//# sourceMappingURL=mt940parser.d.ts.map