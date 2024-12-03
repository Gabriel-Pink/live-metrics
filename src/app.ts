import { WebSocketServer } from 'ws';
import { handleConnection } from './controllers/connectionController';
import { handleApplicationMessages } from './controllers/messageController';
import { config } from './config/config';
import { ClientData } from './models/clientData';
import { ClientConnection } from './models/clienteConnection';
import { IncomingMessage } from 'http';

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
        if (ws.role === 'user') {
            console.log(`[-] Disconnected [-] ${ws.connectionId}`);
        }
        adminClients.forEach(admin => {
            admin.send(JSON.stringify({ type: 'CONN_LOST', data: userClients.get(ws.connectionId) }));
        });
        userClients.delete(ws.connectionId);
    });
});

console.log(`Servidor WebSocket rodando na porta ${config.PORT}`);
