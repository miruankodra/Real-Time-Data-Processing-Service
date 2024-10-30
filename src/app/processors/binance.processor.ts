import { StreamDto } from "../models/stream-dto.model";
import { TickerDTO } from "../models/ticker-dto.model";

export class BinanceProcessor {

    constructor() {}

    public async processTickers(tickerDto: TickerDTO): Promise<StreamDto> {

        
            const price = parseFloat(tickerDto.p);
            const quantity = parseFloat(tickerDto.q);
            const tradeImpact = price * quantity;
            const tradeDirection = tickerDto.m ? 'Sell' : 'Buy';

            return {
                symbol: tickerDto.s,
                trade_impact: tradeImpact,
                trade_direction: tradeDirection,
                trade_timestamp: this.formatDate(new Date(tickerDto.T)),
            }
    }

    private formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
    
        return `${day}-${month}-${year}`;
    }
}