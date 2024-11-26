"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzurePubSubAction = exports.AzurePubSubActionName = void 0;
// https://learn.microsoft.com/de-de/azure/azure-web-pubsub/reference-functions-bindings?tabs=javascript
var AzurePubSubActionName;
(function (AzurePubSubActionName) {
    AzurePubSubActionName["SendToAll"] = "sendToAll";
    AzurePubSubActionName["SendToGroup"] = "sendToGroup";
    AzurePubSubActionName["SendToUser"] = "sendToUser";
    AzurePubSubActionName["SendToConnection"] = "sendToConnection";
    AzurePubSubActionName["AddUserToGroup"] = "addUserToGroup";
    AzurePubSubActionName["RemoveUserFromGroup"] = "removeUserFromGroup";
    AzurePubSubActionName["RemoveUserFromAllGroups"] = "removeUserFromAllGroups";
    AzurePubSubActionName["AddConnectionToGroup"] = "addConnectionToGroup";
    AzurePubSubActionName["RemoveConnectionFromGroup"] = "removeConnectionFromGroup";
    AzurePubSubActionName["CloseAllConnections"] = "closeAllConnections";
    AzurePubSubActionName["CloseClientConnection"] = "closeClientConnection";
    AzurePubSubActionName["CloseGroupConnections"] = "closeGroupConnections";
    AzurePubSubActionName["GrantPermission"] = "grantPermission";
    AzurePubSubActionName["RevokePermission"] = "revokePermission";
})(AzurePubSubActionName = exports.AzurePubSubActionName || (exports.AzurePubSubActionName = {}));
var AzurePubSubAction = /** @class */ (function () {
    function AzurePubSubAction(name) {
        this.name = name;
        this.action = AzurePubSubActionName[name];
    }
    AzurePubSubAction.sendToAll = function (data, dataType, excluded) {
        return Object.assign(new AzurePubSubAction(AzurePubSubActionName.SendToAll), {
            data: JSON.stringify(data),
            dataType: dataType,
            excluded: excluded,
        });
    };
    return AzurePubSubAction;
}());
exports.AzurePubSubAction = AzurePubSubAction;
