import type { FinTSConfig } from '../config.js';
import type { Message } from '../message.js';
import { type Holding, type StatementOfHoldings } from '../mt535parser.js';
import type { Segment } from '../segment.js';
import { type ClientResponse, CustomerOrderInteraction } from './customerInteraction.js';
/**
 * Represents a single holding within a stock portfolio.
 * This is an alias for the Holding interface from the MT535 parser.
 */
export type PortfolioHolding = Holding;
/**
 * Represents the structured portfolio data parsed from an MT535 message.
 * This is an alias for the StatementOfHoldings interface from the MT535 parser.
 */
export type ParsedPortfolioStatement = StatementOfHoldings;
export interface PortfolioResponse extends ClientResponse {
    /**
     * The parsed portfolio statement containing holdings and total value
     */
    portfolioStatement?: ParsedPortfolioStatement;
    /**
     * Raw MT535 data if parsing fails
     */
    rawMT535Data?: string;
}
/**
 * Interaction for requesting and parsing stock portfolio information (HKWPD/HIWPD)
 */
export declare class PortfolioInteraction extends CustomerOrderInteraction {
    accountNumber: string;
    private currency?;
    private priceQuality?;
    private maxEntries?;
    private paginationMarker?;
    constructor(accountNumber: string, currency?: string | undefined, priceQuality?: "1" | "2" | undefined, maxEntries?: number | undefined, paginationMarker?: string | undefined);
    createSegments(config: FinTSConfig): Segment[];
    handleResponse(response: Message, clientResponse: PortfolioResponse): void;
}
//# sourceMappingURL=portfolioInteraction.d.ts.map