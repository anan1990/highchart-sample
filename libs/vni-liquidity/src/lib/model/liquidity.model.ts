export interface MarketLiquidity{
    data: MarketTradingData[]
}

export interface MarketTradingData {
    time: number;
    value: number;
    index?: string;
}