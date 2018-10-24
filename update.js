import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) { 
    const data = JSON.parse(event.body);
    const params = {
        TableName: "poc-notes",
        // Key = partition key and sort key of the update to be updated
        // userId = cognitoId
        // noteId = unique guid in table racord
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // UpdateExpression = attributes to be updated
        // ExpressionAttributeValues = value in the update expression
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":attachment": data.attachment ? data.attachment : null,
            ":content": data.content ? data.content : null
        },
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params);
        callback(null, success({ status: true }));
    } catch(e) {
        callbacl(null, failure({ status: false }));
    }
}