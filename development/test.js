const fs = require("fs");
const zlib = require("zlib");

// const XLSX = require('xlsx');
// const sizeOf = require('image-size');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const downloadFolder = __dirname+"/download/";
const region = "ap-northeast-1";

const {S3Client, GetObjectCommand, ListObjectsV2Command} = require("@aws-sdk/client-s3");
const s3Client = new S3Client({region});

const {DynamoDBDocumentClient,BatchWriteCommand} = require("@aws-sdk/lib-dynamodb");
const {DynamoDBClient} = require("@aws-sdk/client-dynamodb");
const ddbClient = new DynamoDBClient({region});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

(async ()=>{
  // S3からリストを取得
  const Bucket = 'eqs';
  const result = await s3Client.send(new ListObjectsV2Command({
    Bucket,
    Prefix: 'main/',
    StartAfter: 'yahoo',
  }));
  // console.log(result.Contents[0]);
  // console.log(result.Contents.slice(-1)[0]);

  for(const Content of result.Contents){
    const Key = Content.Key;
    const result = await s3Client.send(new GetObjectCommand({Bucket,Key}));
    const buffer = await streamToBuffer(result.Body);
    const text = buffer.toString('utf-8');
    // const json = JSON.parse(text);

    // 保存
    // const fileName = downloadFolder + Key.split('/').pop().replace('@','%40');
    // try{
    //   fs.writeFileSync(fileName, buffer);
    // }catch(e){
    //   console.log(Key);
    //   console.error(e);
    // }
  }
})()

// ReadableStreamからバッファーを取得
function streamToBuffer(stream){
  return new Promise((resolve, reject) => {
      try{
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("error", reject);
          stream.on("end", () => resolve(Buffer.concat(chunks)));
      }catch(e){
          reject(e);
      }
  });
}

/**
 * S3 Client
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/globals.html
 * 
 * ListObjectsV2Command
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectsv2command.html
 * 
 * GetObjectCommand
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/getobjectcommand.html
 */
