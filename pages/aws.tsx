import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import Layout from "@components/Layout";
import CodeButton from "@components/CodeButton";
import CodeBlock from "@components/CodeBlock";

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>AWSへデプロイ - Daichi Next</title>
      </Head>
      <Layout>
        <Typography paragraph variant="h1" component="h1" sx={{fontSize:'36px',fontWeight:700,mb:0.5}}>
          AWSへデプロイ
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          プロジェクトをAWSへデプロイするには、
          <MuiLink href='https://aws.amazon.com/jp/cli/' target="_blank" rel="noopener noreferrer" sx={{mx:1}}>
            AWS CLI
          </MuiLink>
          と
          <MuiLink href='https://github.com/serverless-nextjs/serverless-next.js' target="_blank" rel="noopener noreferrer" sx={{mx:1}}>
            Serverless Framework
          </MuiLink>
          が必要となります。それぞれインストールして、環境に合わせて設定してください。
        </Typography>
        <Typography paragraph variant="h3" component="h3" sx={{fontSize:'18px',fontWeight:700,mt:4}}>
          AWS CLIのインストール
        </Typography>
        <Typography paragraph>
          <MuiLink href='https://aws.amazon.com/jp/cli/' target="_blank" rel="noopener noreferrer" sx={{mr:1}}>
            AWS CLI
          </MuiLink>
          のページを開き、インストーラーをダウンロードし、インストールします。
        </Typography>
        <Typography paragraph variant="h3" component="h3" sx={{fontSize:'18px',fontWeight:700,mt:4}}>
          AWS CLIの設定
        </Typography>
        <Typography paragraph>
          ターミナルから下記コマンドを実行し、アクセスキー、シークレットキー、リージョン、フォーマットを設定します。
        </Typography>
        <Typography paragraph component="div">
          <CodeButton copy>
            aws configure
          </CodeButton>
          <CodeBlock copy language='bash'>{`
$ aws configure
AWS Access Key ID [None]: ********************
AWS Secret Access Key [None]: ****************************************
Default region name [None]: ap-northeast-1
Default output format [None]: json`}
          </CodeBlock>
        </Typography>
        <Typography paragraph variant="h3" component="h3" sx={{fontSize:'18px',fontWeight:700,mt:4}}>
          Serverless Frameworkのインストール
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            npm i -g serverless
          </CodeButton>
        </Typography>
        <Typography paragraph variant="h3" component="h3" sx={{fontSize:'18px',fontWeight:700,mt:4}}>
          Serverless Frameworkの設定
        </Typography>
        <Typography paragraph>
          プロジェクト直下にある serverless.yaml を開き、アプリケーション名やS3のバケット名などを設定してください。
        </Typography>
        <Typography paragraph variant="h3" component="h3" sx={{fontSize:'18px',fontWeight:700,mt:4}}>
          AWSへデプロイする
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            serverless
          </CodeButton>
        </Typography>
      </Layout>
    </>
  )
}

export default Page
