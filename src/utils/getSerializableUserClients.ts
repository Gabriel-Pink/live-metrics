import { ClientData } from "../models/clientData";

export const getSerializableUserClients = ( userClients: Map<string, ClientData> ): Record<string, any> => {
    const serializable = Object.fromEntries(
        [...userClients.entries()].map(([client, data]) => [
            client,
            {
                ip: data.ip,
                userAgent: data.userAgent,
                entryTime: data.entryTime.toISOString(),
                userActivities: data.userActivities,
            },
        ])
    );
    return serializable;
}