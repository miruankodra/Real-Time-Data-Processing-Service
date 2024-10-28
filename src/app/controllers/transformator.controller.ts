import { TickerDTO } from "../models/ticker-dto.model";
import { BinanceProcessor } from "../processors/binance.processor";
import { DeliveryService } from "../services/delivery.service";

export class TransformatorController {

    constructor(private proccessorService: BinanceProcessor, private deliveryService: DeliveryService){}

    public async transformData(tickerDto: TickerDTO[]): Promise<void> {
        const binanceData = await this.proccessorService.processTickers(tickerDto);
        await this.deliveryService.broadcastData(binanceData);
    }
}