import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "./dynamoClient";

export const documentClient = DynamoDBDocumentClient.from(dynamoClient);