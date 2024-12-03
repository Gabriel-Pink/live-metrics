import { WebSocket } from "ws";

export const sendToAllAdmins = (admins: Set<WebSocket>, message: string) => {

    admins.forEach(admin => {
      admin.send(message);
    });
    
};