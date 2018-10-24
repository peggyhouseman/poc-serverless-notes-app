import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) { 
    const params = {
        TableName: "poc-notes",
        // Key = partition key and sort key of item to be deleted
        // userId = cognito userid
        // noteId = note guid in record
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call("delete", params);
        callback(null, success({ status: true }));
    } catch(e) {
        callback(null, failure({ status: false }));
    }
}