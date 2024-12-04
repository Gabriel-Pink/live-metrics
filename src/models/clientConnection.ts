import WebSocket from "ws";
import { Role } from "./role";
import { ClientData } from "./clientData";

export interface ClientConnection extends WebSocket {
    role: Role;
    connectionId: string;
    data: ClientData;
}