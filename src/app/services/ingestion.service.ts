import 'dotenv/config';
import { WebSocket} from 'ws';
import { TransformatorController } from '../controllers/transformator.controller';
import { TickerDTO } from '../models/ticker-dto.model';
import { BufferDto } from '../models/buffer.model';


export class IngesterService {

    private ws: WebSocket | null = null;
    private websocket_url: string = '';

    constructor(private transformator: TransformatorController, wbs_url: string){
        this.websocket_url = wbs_url;
        this.startIngestion();
    }

    public async startIngestion(): Promise<void> {
        this.ws = new WebSocket(this.websocket_url);

        this.ws.on('open', () => {
            console.log('WebSocket connection established');
        });

        this.ws.on('message', (response: Buffer) => {
            const data: TickerDTO = this.bufferToJSON(response);
            this.transformator.transformData(data);
        });

        this.ws.on('close', () => {
            console.log(`Disconnected from WebSocket. Reconnecting...`);
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.ws?.close();
        });
    }

    private async throtleConnection(): Promise<void> {
        // Implement throttling logic here
        await new Promise(resolve => setTimeout(resolve, 5000));
        this.startIngestion();
    }

    public async stopIngestion(): Promise<void> {
        this.ws?.close();
        this.ws = null;
        console.log('WebSocket connection closed');
    }

    private bufferToJSON(bufferData: Buffer): TickerDTO {
        const JSONString = Buffer.from(bufferData).toString();
        return JSON.parse(JSONString);

    }

}