export type PriceData = {
        open: number[];
        volume: number[];
        high: number[];
        low: number[];
        close: number[];
        timestamp: Date[];
};


export type StockData = {
    ticker: string;
    price_data: PriceData;
};
