import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
    const params = { 
        TableName: "poc-notes",
        // KeyConditionExpression = condition for query
        // userId = :userId => only return items with matching userId partition key
        // ExpressionAttributeValues = value for condition above
        // :userId => defines this to be cognito userid
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };

    try {
        const result = await dynamoDbLib.call("query", params);
        callback(null, success(result.Items));
    } catch (e) {
        callback(null, failure({ status: false }));
    }
}