// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_dynamodb.html
import { DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// AWSリージョンを設定します。
const REGION = "ap-northeast-1"; //e.g. "us-east-1"
// Amazon DynamoDBサービスのクライアントオブジェクトを作成します。
const ddbClient = new DynamoDBClient({ region: REGION });

const marshallOptions = {
    // 空の文字列、blob、およびセットを自動的に null に変換するかどうかを指定します。
    convertEmptyValues: false, // false, by default.
    // マーシャリングの際に未定義の値を削除するかどうか。
    removeUndefinedValues: false, // false, by default.
    // typeofオブジェクトをmap属性に変換するかどうか。
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // 数値をJavaScriptのネイティブな数値に変換するのではなく、文字列として返すかどうか。
    // これにより、任意のサイズの数値を安全に往復させることができます。
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

// DynamoDB Documentクライアントを作成します。
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export { ddbDocClient };
