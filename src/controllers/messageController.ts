import { ClientConnection } from '../models/clientConnection';
import { addUserActivity } from '../services/userService';
import { ClientData } from '../models/clientData';

export const handleApplicationMessages = (ws: ClientConnection, parsedData: any, adminClients: Set<ClientConnection>, userClients: Map<string, ClientData>) => {

    if (ws.role !== 'user') {
        ws.send(JSON.stringify({ type: 'ERROR', message: 'Only users can send LOG messages.' }));
        return;
    }

    if (parsedData.type === 'LOG') {

        console.log(`Log received from user: ${ws.connectionId}`);
        const clientData = userClients.get(ws.connectionId);
        const { content, actionType } = parsedData.data;

        if (clientData) {
            addUserActivity(clientData, content, actionType);
        }

        adminClients.forEach((admin) => {
            admin.send(JSON.stringify({ ...parsedData, from: ws.connectionId }));
        });
    } else {

        ws.send(JSON.stringify({ type: 'ERROR', message: 'Invalid message type or format.' }));

    }
};