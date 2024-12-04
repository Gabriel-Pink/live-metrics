import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { documentClient } from "../config/documentClient";
import { ClientData } from "../models/clientData";

const TABLE_NAME = "live-metrics";

export async function saveClientData(connectionId: string, clientData: ClientData): Promise<ClientData> {

    const params = {
        TableName: TABLE_NAME,
        Item: {
            connectionId,
            ipAddress: clientData.ip,
            userAgent: clientData.userAgent,
            entryTime: clientData.entryTime,
            exitTime: clientData.exitTime,
            userActivities: clientData.userActivities
        },
    };



    await documentClient.send(new PutCommand(params));
    return clientData;
}