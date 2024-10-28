import 'dotenv/config';
import { IngesterService } from './app/services/ingestion.service';
import { WebSocket } from 'ws';
import { DeliveryService } from './app/services/delivery.service';
import { BinanceProcessor } from './app/processors/binance.processor';
import { TransformatorController } from './app/controllers/transformator.controller';


const processor = new BinanceProcessor();
const postman = new DeliveryService();
const transformator = new TransformatorController(processor, postman);

const btcIngester = new IngesterService(transformator, process.env.DATA_SOURCE_URL || '');

