import { StreamDto } from "../models/stream-dto.model";
import { TickerDTO } from "../models/ticker-dto.model";

export class BinanceProcessor {

    constructor() {}

    public async processTickers(tickerDto: TickerDTO[]): Promise<StreamDto[]> {
        return await tickerDto.map(ticker => {
            const openPrice = parseFloat(ticker.o);
            const currentPrice = parseFloat(ticker.c);
            const highPrice = parseFloat(ticker.h);
            const lowPrice = parseFloat(ticker.l);
            const totalVolume = parseFloat(ticker.v);
            const totalQuoteVolume = parseFloat(ticker.q);

            const priceChangePercentage = this.calculatePriceChangePercentage(openPrice, currentPrice);
            const volatility = this.calculateVolatility(highPrice, lowPrice);
            const VWAP = this.calculateVWAP(totalVolume, totalQuoteVolume);
            const aggregatedVolume = this.calculateAggregatedVolume(tickerDto);

            return {
                symbol: ticker.s,
                currentPrice: currentPrice,
                priceChangePercentage: priceChangePercentage,
                volatility: volatility,
                VWAP: VWAP,
                aggregatedVolume: aggregatedVolume,
            }
        })
    }

    private calculatePriceChangePercentage(openPrice:number, currentPrice:number): number {
        return ((currentPrice - openPrice) / openPrice) * 100;
    }

    private calculateVolatility(highPrice:number, lowPrice:number): number {
        return highPrice - lowPrice;
    }

    private calculateVWAP(totalVolume:number, totalQuoteVolume:number): number {
        return totalQuoteVolume / totalVolume;
    }

    private calculateAggregatedVolume(tickerDto: TickerDTO[]): number {
        return tickerDto.reduce((total, ticker) => total + parseFloat(ticker.v), 0);
    }
}