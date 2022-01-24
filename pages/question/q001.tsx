import type {NextPage} from 'next'
import Head from 'next/head'
import React from 'react'
import {useForm, Controller} from "react-hook-form";
import {TextField, Typography, Divider, Alert} from '@mui/material';
import Layout from "@components/Layout";

const Page: NextPage = () => {

  /**
   * 指定された値を２倍にする
   * @param inputValue フォームで入力された値
   */
  const mainProcessing = (inputValue:any) => {
    // TODO: ここに実装する
    

  }

  const { control } = useForm({ mode:'all' });
  const [ values, setValues ] = React.useState<{[key:string]:any}>({});
  const handleChange = ({name}:{name:string},onChange:any) => 
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    setValues({...values,[name]:value});
    onChange(event);
  }
  return (
    <>
      <Head>
        <title>01:数値を2倍 - Daichi Next</title>
      </Head>
      <Layout>
        <Typography paragraph variant="h1" component="h1" sx={{fontSize:'36px',fontWeight:700,mb:0.5}}>
          問01 - 数値を2倍
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph variant="h6" sx={{fontSize:'18px'}}>
          フォームで入力された数値を２倍にして、画面に出力してください。
        </Typography>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          条件
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          すべてのテストケースにおいて、以下の条件をみたします。
        </Typography>
        <ul>
          <li>入力される値は整数</li>
        </ul>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          入力フォーム
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          整数を入力してください。
        </Typography>
        <Typography paragraph>
          <Controller
            name="value01"
            render={({field:{ref,value,onChange,...fs},fieldState:{error}}) => 
              <TextField label="整数" type='number' error={Boolean(error)} helperText={error?.message}
                inputRef={ref} onChange={handleChange(fs,onChange)} value={values[fs.name]}{...fs} />
            }
            rules={{
              required: '必須項目です',
              pattern: { value: /^-?[0-9]+$/, message: '整数で入力してください'}
            }}
            control={control}
          />
        </Typography>
        <Typography paragraph variant="h2" component="h2" sx={{fontSize:'24px',fontWeight:700,mt:5,mb:0.5}}>
          処理結果
        </Typography>
        <Divider sx={{mb:2}}/>
        <Typography paragraph>
          {((inputValue)=>{
            const result = inputValue!=null? mainProcessing(inputValue) : "入力フォームに数値が入力されていません";
            const severity = inputValue!=null? result==null? "error" : "success" : "warning";
            return <Alert icon={false} severity={severity} sx={{fontSize:'16px'}}>{String(result)}</Alert>
          })(values.value01)}
        </Typography>
      </Layout>
    </>
  )
}

export default Page
