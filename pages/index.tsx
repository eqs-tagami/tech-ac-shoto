import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useForm, Controller, 
  ControllerRenderProps, FieldValues, ControllerFieldState, UseFormStateReturn } from "react-hook-form";

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import Layout from "@components/Layout";
import CodeButton from "@components/CodeButton";
import CodeBlock from "@components/CodeBlock";

const Page: NextPage = () => {
  const { control, formState, getValues, setValue } = useForm({ mode:'all', /*delayError:200*/ });
  const [ lsLoad, setLsLoad ] = useState(false);
  const [ values, setValues ] = useState<{[key:string]:any}>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && !lsLoad) {
      const ls:any = {};
      for (let i=0; i<window.localStorage.length; i++){
        const key = window.localStorage.key(i);
        if(key && !key.endsWith('cache')){
          const value = window.localStorage.getItem(key);
          ls[key] = value;
          setValue(key, value);
        }
      }
      setValues({...values,...ls});
      setLsLoad(true);
    }
  });

  const handleChange = ({name}:{name:string},onChange:any) => 
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    if (typeof window !== 'undefined')
      window.localStorage.setItem(name, value);
    setValues({...values,[name]:value});
    onChange(event);
  }

  return (
    <>
      <Head>
        <title>Daichi Next</title>
      </Head>
      <Layout>
        <Typography paragraph variant="h1" component="h1" sx={{fontSize:'36px',fontWeight:700,mb:0.5}}>
          はじめに
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph variant="h6" sx={{fontSize:'18px'}}>
          このプロジェクトは開発学習用のプロジェクトです。<br/>
          はじめに学習環境を構築します。
        </Typography>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          基本情報の入力
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          Visual Studio Codeのワークスペースのパスを入力してください。
        </Typography>
        <Typography paragraph>
          <Controller
            name="workspace"
            render={({field:{ref,value,onChange,...fs},fieldState:{error}}) => 
              <TextField label="ワークスペースのパス" fullWidth error={Boolean(error)} helperText={error?.message}
                inputRef={ref} onChange={handleChange(fs,onChange)} value={values[fs.name]}{...fs} />
            }
            rules={{ required: '必須項目です' }}
            control={control}
          />
        </Typography>
        <Typography paragraph>
          名前を半角英字で入力してください。
        </Typography>
        <Typography paragraph>
          <Controller
            name="name"
            render={({field:{ref,value,onChange,...fs},fieldState:{error}}) => 
              <TextField label="名前" error={Boolean(error)} helperText={error?.message}
                inputRef={ref} onChange={handleChange(fs,onChange)} value={values[fs.name]}{...fs} />
            }
            rules={{
              required: '必須項目です',
              pattern: { value: /^[a-z]+$/, message: '半角英字で入力してください'}
            }}
            control={control}
          />
        </Typography>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          テンプレートのダウンロード
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          ターミナルの作業ディレクトリをワークスペースへ移動する。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            cd {values.workspace || "${ワークスペースのパス}"}
          </CodeButton>
        </Typography>
        <Typography paragraph>
          GitHubからリポジトリをダウンロードする。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            git clone https://github.com/daichi-group/tech-ac.git tech-ac-{values.name || "${名前}"}
          </CodeButton>
        </Typography>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          GitHubで新しいリポジトリの作成
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          <MuiLink href='https://github.com/organizations/daichi-group/repositories/new' target="_blank" rel="noopener noreferrer" sx={{mr:1}}>
            GitHub
          </MuiLink>
          にアクセスし、「Repository name」に
          <CodeButton copy sx={{mx:1}}>
          tech-ac-{values.name || "${名前}"}
          </CodeButton>
          を入力して、「Create repository」ボタンを押し、新しいレポジトリを作成してください。
        </Typography>
        <Typography paragraph>
          ターミナルの作業ディレクトリを移動する。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            cd tech-ac-{values.name || "${名前}"}
          </CodeButton>
        </Typography>
        <Typography paragraph>
          リモートリポジトリを変更する。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            git remote set-url origin https://github.com/daichi-group/tech-ac-{values.name || "${名前}"}.git
          </CodeButton>
        </Typography>
        <Typography paragraph>
          プッシュする。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            git push -u origin main
          </CodeButton>
        </Typography>
        <Typography paragraph>
          GitHubの
          <MuiLink href={`https://github.com/daichi-group/tech-ac-${values.name || "${名前}"}`} target="_blank" rel="noopener noreferrer" sx={{mx:1}}>
            daichi-group/tech-ac-{values.name || "${名前}"}
          </MuiLink>
          のページにアクセスし、ファイルがアップロードされていることを確認する。
        </Typography>

        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          パッケージのインストール
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          必要なパッケージをインストールする。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            npm i
          </CodeButton>
        </Typography>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          開発モードで実行
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          プロジェクトを開発モードで実行します。
        </Typography>
        <Typography paragraph>
          <CodeButton copy>
            npm run dev
          </CodeButton>
        </Typography>
        <Typography paragraph>
          実行後
          <MuiLink href='http://localhost:3000/' target="_blank" rel="noopener noreferrer" sx={{mx:1}}>
            http://localhost:3000/
          </MuiLink>
          でページを開くことができるようになります。
        </Typography>
      </Layout>
    </>
  )
}

export default Page
