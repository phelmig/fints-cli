export interface StatementOfHoldings {
    totalValue?: number;
    currency?: string;
    holdings: Holding[];
}
export interface Holding {
    isin?: string;
    wkn?: string;
    name?: string;
    date?: Date;
    amount?: number;
    price?: number;
    value?: number;
    currency?: string;
    acquisitionDate?: Date;
    acquisitionPrice?: number;
}
export declare class Mt535Parser {
    private rawData;
    constructor(rawData: string);
    parse(): StatementOfHoldings;
}
//# sourceMappingURL=mt535parser.d.ts.map