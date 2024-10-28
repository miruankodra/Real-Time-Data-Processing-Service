import { WebSocketServer } from "ws";
import { TickerDTO } from "../models/ticker-dto.model";
import { StreamDto } from "../models/stream-dto.model";

export class DeliveryService {

    private wss: WebSocketServer;
    private port = 3000;


    constructor(){
        this.wss = new WebSocketServer({port: this.port});
        this.streamData();
    };

    public async streamData(): Promise<void> {
        this.wss.on('listening', () => {
            console.log('WebSocket server is listening on port ' + this.port);
        });
        this.wss.on('connection', (ws) => {
            console.log('WebSocket client connected');
            ws.send('Connection established...');

            ws.on('message', (message) => {
                console.log('Received message:', message);
                ws.send('Message received');
            });

            ws.on('close', () => {
                console.log('WebSocket client disconnected');
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });
        });

    }


    public async pushData(): Promise<void> {

    }

    public async broadcastData(streamData: StreamDto[]): Promise<void> {
        this.wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) {
                const data = JSON.stringify(streamData);
                client.send(data);
            }
        });
    }

    public async close(): Promise<void> {
        if (this.wss) {
            this.wss.close();
        }
    }
}