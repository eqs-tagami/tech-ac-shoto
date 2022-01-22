import * as zlib from 'zlib';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/interfaces/querycommandinput.html
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
import { ddbDocClient } from "@lib/ddbDocClient";
import {
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

import { s3Client, streamToBuffer } from "@lib/s3Client";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export function getNodeText(node:any): string{
  if (['string', 'number'].includes(typeof node)) return String(node);
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (typeof node==='object' && node) return getNodeText(node.props.children);
  return ''
}

export function isString(obj:any) {
  return (typeof (obj) === "string" || obj instanceof String);
}

export async function getS3Data(Bucket: string, Key: string){
  try {
    const result = await s3Client.send(new GetObjectCommand({Bucket,Key}));
    const buffer = await streamToBuffer(result.Body);
    const binary: Buffer | undefined = await new Promise((resolve) => {
      zlib.brotliDecompress(buffer, (error, result)=>{
        resolve(error? undefined : result)
      })
    })
    if(binary){
      return JSON.parse(binary.toString('utf-8'));
    }
  } catch (err) {
  }
  return null;
}

export async function setS3Data(Bucket: string, Key: string, data: any){
  try {
    const binary: Buffer | undefined = await new Promise((resolve) => {
      zlib.brotliCompress(JSON.stringify(data), (error, result)=>{
          resolve(error? undefined : result);
      })
    })
    if(binary){
      return await s3Client.send(
        new PutObjectCommand({
          Bucket, Key,
          Body: binary
        })
      );
    }
  } catch (err) {
  }
  return null;
}

export async function getDynamoDBTableData(TableName: string){
  let items:{[key:string]:any}[] = [];
  let exclusiveStartKey = null;
  for(let i=0;i<100;i++){
    const result:any = await ddbDocClient.send(new ScanCommand({
      TableName,
      ExclusiveStartKey: exclusiveStartKey,
    }))
    if(result.Items){
      items = items.concat(result.Items);
    }
    exclusiveStartKey = result.LastEvaluatedKey;
    if(!exclusiveStartKey) break;
  }
  return items;
}

export async function getTableData(TableName: string, Bucket: string, cacheFolder: string){
  const Key = `${cacheFolder}${TableName}.json.br`;
  let Items = await getS3Data(Bucket, Key);
  if(Items) return Items;
  Items = await getDynamoDBTableData(TableName);
  if(Items) await setS3Data(Bucket, Key, Items);
  return Items;
}
