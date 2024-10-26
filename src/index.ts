import 'dotenv/config';
import { Ingester } from './app/services/ingestion.service';

const btcIngeter = new Ingester(process.env.DATA_SOURCE_URL ?? '');