import { FinTSConfig } from './config.js';
import { type AccountBalanceResponse } from './interactions/balanceInteraction.js';
import type { StatementResponse } from './interactions/customerInteraction.js';
import type { InitResponse } from './interactions/initDialogInteraction.js';
import { type PortfolioResponse } from './interactions/portfolioInteraction.js';
import type { TanMethod } from './tanMethod.js';
export interface SynchronizeResponse extends InitResponse {
}
/**
 * A client to communicate with a bank over the FinTS protocol
 */
export declare class FinTSClient {
    config: FinTSConfig;
    private currentDialog;
    /**
     * Creates a new FinTS client
     * @param config - the configuration for the client, use the static factory methods FinTSConfig.forFirstTimeUse or FinTSConfig.fromBankingInformation to create a configuration
     */
    constructor(config: FinTSConfig);
    /**
     * Selects a TAN method by its ID
     * @param tanMethodId - the ID of the TAN method to select, get the ID from FinTSClient.config.availableTanMethods
     * @returns the selected TAN method
     */
    selectTanMethod(tanMethodId: number): TanMethod;
    /**
     * Selects a TAN media by its name
     * @param tanMediaName - the name of the TAN media to select corresponding to a name in TanMethod.activeTanMedia
     */
    selectTanMedia(tanMediaName: string): void;
    /**
     * Synchronizes information with the bank, updating config.bankingInformation
     * @returns the synchronization response
     */
    synchronize(): Promise<SynchronizeResponse>;
    /**
     * Continues the synchronization transaction when a TAN is required
     * @param tanReference The TAN reference provided in the first call's response
     * @param tan The TAN entered by the user, can be omitted if a decoupled TAN method is used
     * @returns the synchronization response
     */
    synchronizeWithTan(tanReference: string, tan?: string): Promise<SynchronizeResponse>;
    /**
     * Checks if the bank supports fetching an account balance in general or for the given account number when provided
     * @param accountNumber when the account number is provided, checks if the account supports fetching the balance
     * @returns true if the bank (and account) supports fetching the account balance
     */
    canGetAccountBalance(accountNumber?: string): boolean;
    /**
     * Fetches the account balance for the given account number
     * @param accountNumber - the account number to fetch the balance for, must be an account available in the config.baningInformation.UPD.accounts
     * @returns the account balance response
     */
    getAccountBalance(accountNumber: string): Promise<AccountBalanceResponse>;
    /**
     * Continues the account balance fetching when a TAN is required
     * @param tanReference The TAN reference provided in the first call's response
     * @param tan The TAN entered by the user, can be omitted if a decoupled TAN method is used
     * @returns the account balance response
     */
    getAccountBalanceWithTan(tanReference: string, tan?: string): Promise<AccountBalanceResponse>;
    /**
     * Checks if the bank supports fetching account statements in general or for the given account number when provided
     * @param accountNumber when the account number is provided, checks if the account supports fetching of statements
     * @returns true if the bank (and account) supports fetching account statements
     */
    canGetAccountStatements(accountNumber?: string): boolean;
    /**
     * Fetches the account statements for the given account number
     * @param accountNumber - the account number to fetch the statements for, must be an account available in the config.baningInformation.UPD.accounts
     * @param from - an optional start date of the period to fetch the statements for
     * @param to - an optional end date of the period to fetch the statements for
     * @param preferCamt - whether to prefer CAMT format over MT940 when both are supported (default: true)
     * @returns an account statements response containing an array of statements
     */
    getAccountStatements(accountNumber: string, from?: Date, to?: Date, preferCamt?: boolean): Promise<StatementResponse>;
    /**
     * Continues the account statements fetching when a TAN is required
     * @param tanReference The TAN reference provided in the first call's response
     * @param tan The TAN entered by the user, can be omitted if a decoupled TAN method is used
     * @returns an account statements response containing an array of statements
     */
    getAccountStatementsWithTan(tanReference: string, tan?: string): Promise<StatementResponse>;
    /**
     * Checks if the bank supports fetching portfolio information in general or for the given account number when provided
     * @param accountNumber when the account number is provided, checks if the account supports fetching of portfolio information
     * @returns true if the bank (and account) supports fetching portfolio information
     */
    canGetPortfolio(accountNumber?: string): boolean;
    /**
     * Fetches the portfolio information for the given depot account number
     * @param accountNumber - the depot account number to fetch the portfolio for, must be an account available in the config.bankingInformation.UPD.accounts
     * @param currency - optional currency filter for the portfolio statement
     * @param priceQuality - optional price quality filter ('1' for real-time, '2' for delayed)
     * @param maxEntries - optional maximum number of entries to retrieve
     * @returns a portfolio response containing holdings and total value
     */
    getPortfolio(accountNumber: string, currency?: string, priceQuality?: '1' | '2', maxEntries?: number): Promise<PortfolioResponse>;
    /**
     * Continues the portfolio fetching when a TAN is required
     * @param tanReference The TAN reference provided in the first call's response

     * @param tan The TAN entered by the user, can be omitted if a decoupled TAN method is used
     * @returns a portfolio response containing holdings and total value
     */
    getPortfolioWithTan(tanReference: string, tan?: string): Promise<PortfolioResponse>;
    /**
     * Checks if the bank supports fetching credit card statements in general or for the given account number
     * @param accountNumber when the account number is provided, checks if the account supports fetching of statements
     * @returns true if the bank (and account) supports fetching credit card statements
     */
    canGetCreditCardStatements(accountNumber?: string): boolean;
    /**
     * Fetches the credit card statements for the given account number
     * @param accountNumber - the account number to fetch the statements for, must be a credit card account available
     * in the config.baningInformation.UPD.accounts
     * @param from - an optional start date of the period to fetch the statements for
     * @param to - an optional end date of the period to fetch the statements for
     * @returns an account statements response containing an array of statements
     */
    getCreditCardStatements(accountNumber: string, from?: Date): Promise<StatementResponse>;
    /**
     * Continues the credit card statements fetching when a TAN is required
     * @param tanReference The TAN reference provided in the first call's response
     * @param tan The TAN entered by the user, can be omitted if a decoupled TAN method is used
     * @returns a credit card statements response containing an array of statements
     */
    getCreditCardStatementsWithTan(tanReference: string, tan?: string): Promise<StatementResponse>;
    startCustomerOrderInteraction(interaction: import('./interactions/customerInteraction.js').CustomerOrderInteraction): Promise<import('./interactions/customerInteraction.js').ClientResponse>;
    continueCustomerInteractionWithTan(segIds: string[], tanReference: string, tan?: string): Promise<import('./interactions/customerInteraction.js').ClientResponse>;
}
//# sourceMappingURL=client.d.ts.map