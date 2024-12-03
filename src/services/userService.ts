import { ClientData } from "../models/clientData";

export const addUserActivity = (clientData: ClientData, content: string, actionType: string) => {

    const userActivity = {
        content,
        actionType,
        actionTime: Date.now(),
    };

    clientData.userActivities.push(userActivity);

};
