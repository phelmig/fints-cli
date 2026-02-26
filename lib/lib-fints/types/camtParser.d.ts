import type { Statement } from './statement.js';
export declare class CamtParsingError extends Error {
    cause?: Error | undefined;
    constructor(message: string, cause?: Error | undefined);
}
export declare class CamtParser {
    private xmlData;
    private parser;
    constructor(xmlData: string);
    parse(): Statement[];
    private getDocumentObject;
    private getReports;
    private parseReport;
    private getValueFromPath;
    private parseBalances;
    private parseTransactions;
    private parseTransaction;
    /**
     * Extract party name from various possible CAMT structures
     * Handles both direct name (<Dbtr><Nm>) and party structure (<Dbtr><Pty><Nm>)
     */
    private extractPartyName;
    /**
     * Extract bank identification code from various possible CAMT structures
     * Handles both BIC and BICFI elements
     */
    private extractBankId;
    private parseDate;
    private parseBankTransactionCode;
}
//# sourceMappingURL=camtParser.d.ts.map