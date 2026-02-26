import type { BankAccount } from './bankAccount.js';
import type { BankingInformation } from './bankingInformation.js';
import type { TanMethod } from './tanMethod.js';
/**
 * Configuration for the FinTS client
 */
export declare class FinTSConfig {
    productId: string;
    productVersion: string;
    private url?;
    private bankIdentification?;
    userId?: string | undefined;
    pin?: string | undefined;
    tanMethodId?: number | undefined;
    tanMediaName?: string | undefined;
    customerId?: string | undefined;
    private country;
    bankingInformation: BankingInformation;
    debugEnabled: boolean;
    private constructor();
    /**
     * Factory method to create a configuration for the first time use i.e. no previous banking information is available
     * @param productId The product ID obtained by registering with ZKA, see https://www.hbci-zka.de/register/prod_register.htm
     * @param productVersion The version of your end product
     * @param url The banks FinTS endpoint URL
     * @param bankId The bank ID (BLZ)
     * @param userId The user ID
     * @param pin The PIN to authenticate the user
     * @param customerId An optional customer ID when this is not the same as the user ID
     * @param countryCode The country code of the bank, defaults to 280 (Germany)
     * @returns a FinTS configuration
     */
    static forFirstTimeUse(productId: string, productVersion: string, url: string, bankId: string, userId?: string, pin?: string, customerId?: string, countryCode?: number): FinTSConfig;
    /**
     * Factory method to create a configuration from existing banking information
     * @param productId The product ID obtained by registering with ZKA, see https://www.hbci-zka.de/register/prod_register.htm
     * @param productVersion The version of your end product
     * @param bankingInformation The banking information obtained from a previous synchronization
     * @param userId The user ID
     * @param pin The PIN to authenticate the user
     * @param tanMethodId The ID of the TAN method to use, see config.availableTanMethods
     * @param tanMediaName The name of the TAN media to use, see config.selectedTanMethod.activeTanMedia
     * @param customerId An optional customer ID when this is not the same as the user ID
     * @param countryCode The country code of the bank, defaults to 280 (Germany)
     * @returns a FinTS configuration
     */
    static fromBankingInformation(productId: string, productVersion: string, bankingInformation: BankingInformation, userId?: string, pin?: string, tanMethodId?: number, tanMediaName?: string, customerId?: string, countryCode?: number): FinTSConfig;
    /**
     * The FinTS URL of the bank
     */
    get bankingUrl(): string;
    /**
     * The country code of the bank
     */
    get countryCode(): number;
    /**
     * The bank ID (BLZ)
     */
    get bankId(): string;
    /**
     * A list of all available TAN methods for the user
     */
    get availableTanMethods(): TanMethod[];
    /**
     * Selects a TAN method by its ID for the user, see also FinTSConfig#availableTanMethods
     * @param tanMethodId The ID of the TAN method to select, corresponding to an ID in availableTanMethods
     */
    selectTanMethod(tanMethodId: number): TanMethod;
    /**
     * Selects a TAN media by its name for the user
     * @param tanMediaName The name of the TAN media, corresponding to a name in selectedTanMethod.activeTanMedia
     */
    selectTanMedia(tanMediaName: string): void;
    /**
     * The currently selected TAN method for the user
     */
    get selectedTanMethod(): TanMethod | undefined;
    /**
     * Gets the transaction parameters for a specific transaction ID
     * @param transId The transaction ID
     * @returns The transaction parameters or undefined if not available
     */
    getTransactionParameters<T>(transId: string): T | undefined;
    /**
     * Checks if a transaction is supported by the bank
     * @param transId The transaction ID
     */
    isTransactionSupported(transId: string): boolean;
    /**
     * Checks if a transaction is supported for a specific account
     * @param accountNumber The account number
     * @param transId The transaction ID
     */
    isAccountTransactionSupported(accountNumber: string, transId: string): boolean;
    /**
     * Gets the maximum supported transaction version of a transaction, considering this client's support and the bank's support
     * @param transId The transaction ID
     */
    getMaxSupportedTransactionVersion(transId: string): number | undefined;
    /**
     * Gets the bank account information for a specific account number
     * @param accountNumber The account number
     */
    getBankAccount(accountNumber: string): BankAccount;
}
//# sourceMappingURL=config.d.ts.map