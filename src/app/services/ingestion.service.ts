import 'dotenv/config';
import { WebSocket} from 'ws';


export class Ingester {

    private ws: WebSocket | null = null;
    private websocket_url: string = '';
    

    constructor(wbs_url: string){
        this.websocket_url = wbs_url;
        this.startIngestion();
    }

    public async startIngestion(): Promise<void> {
        this.ws = new WebSocket(this.websocket_url);

        this.ws.on('open', () => {
            console.log('WebSocket connection established');
        });

        this.ws.on('message', (response: string) => {
            const data = JSON.parse(response);
            console.log(`Received message: ${data.s}`);
        });

        this.ws.on('close', () => {
            console.log(`Disconnected from WebSocket. Reconnecting...`);
        });

        this.ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            this.ws?.close();
        });
    }

    public async stopIngestion(): Promise<void> {
        this.ws?.close();
        this.ws = null;
        console.log('WebSocket connection closed');
    }

}