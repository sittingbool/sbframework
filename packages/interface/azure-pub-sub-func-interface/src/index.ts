// https://learn.microsoft.com/de-de/azure/azure-web-pubsub/reference-functions-bindings?tabs=javascript
export enum AzurePubSubActionName {
    SendToAll = 'sendToAll',
    SendToGroup = 'sendToGroup',
    SendToUser = 'sendToUser',
    SendToConnection = 'sendToConnection',
    AddUserToGroup = 'addUserToGroup',
    RemoveUserFromGroup = 'removeUserFromGroup',
    RemoveUserFromAllGroups = 'removeUserFromAllGroups',
    AddConnectionToGroup = 'addConnectionToGroup',
    RemoveConnectionFromGroup = 'removeConnectionFromGroup',
    CloseAllConnections = 'closeAllConnections',
    CloseClientConnection = 'closeClientConnection',
    CloseGroupConnections = 'closeGroupConnections',
    GrantPermission = 'grantPermission',
    RevokePermission = 'revokePermission',
}
export type AzurePubSubActionDataType = 'text' | 'binary' | 'json';
export class AzurePubSubAction {
    action: string;
    data: string;
    userId?: string;
    excluded?: string[];

    constructor(private readonly name: AzurePubSubActionName) {
        this.action = AzurePubSubActionName[name];
    }

    static sendToAll(data: any, dataType?: AzurePubSubActionDataType, excluded?: string[]): AzurePubSubAction {
        return Object.assign(new AzurePubSubAction(AzurePubSubActionName.SendToAll), {
            data: JSON.stringify(data),
            dataType,
            excluded,
        });
    }
}
