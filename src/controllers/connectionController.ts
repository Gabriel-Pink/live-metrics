import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";
import { authenticateAdmin } from "../services/authService";
import { logConnection, logError } from "../services/loggerService";
import { sendToAllAdmins } from "../utils/websocketUtils";
import { ClientConnection } from "../models/clientConnection";
import { ClientData } from "../models/clientData";
import { getSerializableUserClients } from "../utils/getSerializableUserClients";

export const handleConnection = (ws: ClientConnection, request: IncomingMessage, adminClients: any, userClients: any) => {
    const connectionId = uuidv4();
    ws.connectionId = connectionId;

    if (request.headers.authorization) {
        const token = request.headers.authorization.split(' ')[1];

        try {

            authenticateAdmin(token);
            ws.role = 'admin';
            adminClients.add(ws);
            logConnection(`Admin from ${request.socket.remoteAddress} connected.`);
            ws.send(JSON.stringify({ type: 'USER_LIST', data: getSerializableUserClients(userClients) }));

        } catch (error) {

            logError('[*] Login attempt by an admin, connection refused');
            ws.close();

        }
    } else {

        ws.role = 'user';

        const clientData: ClientData = {
            ip: request.socket.remoteAddress,
            userAgent: request.headers['user-agent'],
            entryTime: Date.now(),
            userActivities: [],
        };

        userClients.set(connectionId, clientData);

        logConnection(`User from ${request.socket.remoteAddress} connected.`);
        sendToAllAdmins(adminClients, JSON.stringify({ type: 'CONN_RECV', data: clientData }));
    }
};