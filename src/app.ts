import { WebSocketServer } from 'ws';
import { handleConnection } from './controllers/connectionController';
import { handleApplicationMessages } from './controllers/messageController';
import { config } from './config/config';
import { ClientData } from './models/clientData';
import { ClientConnection } from './models/clientConnection';
import { IncomingMessage } from 'http';
import { saveClientData } from './repositories/clientRepository';

const wss = new WebSocketServer({ port: config.PORT });

const adminClients: Set<ClientConnection> = new Set();
const userClients: Map<string, ClientData> = new Map();

wss.on('connection', (ws: ClientConnection, request: IncomingMessage) => {

    handleConnection(ws, request, adminClients, userClients);

    ws.on('message', (message: string) => {
        try {
            const parsedData = JSON.parse(message);
            handleApplicationMessages(ws, parsedData, adminClients, userClients);
        } catch (error) {
            console.log(`[-] ERROR [-] ${error}`);
        }
    });

    ws.on('close', () => {

        const clientData = userClients.get(ws.connectionId)

        if (ws.role === 'user') {
            
            console.log(`[-] Disconnected [-] ${ws.connectionId}`);

            if(clientData){

                clientData.exitTime = Date.now();
                saveClientData(ws.connectionId, clientData)

            } 

        }
        adminClients.forEach(admin => {
            admin.send(JSON.stringify({ type: 'CONN_LOST', data: { ...clientData, connectionId: ws.connectionId } }));
        });
        userClients.delete(ws.connectionId);
    });
});

console.log(`Server run on port ${config.PORT}`);
