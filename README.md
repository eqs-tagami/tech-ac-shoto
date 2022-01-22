# Next.js テンプレート v3

このプロジェクトはNext.js用のテンプレートです。
ワークスペースにGitのリポジトリをコピーして利用してください。

GitHubからリポジトリをコピーする。

```bash
git clone https://github.com/daichi-group/nextjs-template3.git
```

作業ディレクトリを移動する。

```bash
cd nextjs-template3
```

## パッケージのインストール

プロジェクトを動かすために必要なパッケージをインストールする。

```bash
npm i
```

## 開発モードで実行
プロジェクトを開発モードで実行します。

```bash
npm run dev
```

実行後 [http://localhost:3000/](http://localhost:3000/) でページを開くことができるようになります。

## AWSへデプロイ

プロジェクトをAWSへデプロイするには、[AWS CLI](https://aws.amazon.com/jp/cli/)と[Serverless Framework](https://github.com/serverless-nextjs/serverless-next.js)が必要となります。それぞれインストールして、環境に合わせて設定してください。

### AWS CLIのインストール

[AWS CLI](https://aws.amazon.com/jp/cli/)のページを開き、インストーラーをダウンロードし、インストールします。

### AWS CLIの設定

ターミナルから下記コマンドを実行し、アクセスキー、シークレットキー、リージョン、フォーマットを設定します。

```bash
aws configure
```

```bash
$ aws configure
AWS Access Key ID [None]: ********************
AWS Secret Access Key [None]: ****************************************
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

### Serverless Frameworkのインストール

```bash
npm i -g serverless
```

### Serverless Frameworkの設定

プロジェクト直下にある serverless.yaml を開き、アプリケーション名やS3のバケット名などを設定してください。

### AWSへデプロイする

```bash
serverless
```
