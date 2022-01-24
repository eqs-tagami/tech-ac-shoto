import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';
import createStore from '@lib/createStore';

import PropTypes from "prop-types";
// import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider, EmotionCache } from "@emotion/react";
// import theme from "@lib/theme";
import createEmotionCache from "@lib/createEmotionCache";

// クライアント側のキャッシュで、ブラウザのユーザーのセッション全体に対して共有される。
const clientSideEmotionCache = createEmotionCache();

import 'nprogress/nprogress.css'
import '/styles/globals.scss'

// バーの設定
//    showSpinner: バーと一緒にローディングスピナーを表示するかどうか
//    speed: バーが右端に到達し消えるまでの時間 (msec)
//    minimum: バーの開始地点
NProgress.configure({ showSpinner: false, speed: 300, minimum: 0.25 })

// [Next.jsのルーティング](https://qiita.com/tetsutaroendo/items/e444bd606c5fa79d2209)
// ルートが変化を開始する際に発火
Router.events.on('routeChangeStart', (url)=>{
  // console.log("routeChangeStart",url);
  NProgress.start()
})
// ルートの変化が完了した際に発火
Router.events.on('routeChangeComplete', (url)=>{
  // console.log("routeChangeComplete",url);
  NProgress.done()
})
// ルートが変化する最中、エラーが起こった際に発火
Router.events.on('routeChangeError', (err)=>{
  // console.log("routeChangeError",err);
  NProgress.done()
})
// // ブラウザ履歴が変化する直前に発火
// Router.events.on('beforeHistoryChange', (url)=>{
//   console.log("beforeHistoryChange",url);
// })
// // ページが遷移せず、ハッシュでの遷移（id付きのaタグでスクロールするなど）が開始する際に発火
// Router.events.on('hashChangeStart', (url)=>{
//   console.log("hashChangeStart",url);
// })
// // ページが遷移せず、ハッシュでの遷移が完了した際に発火
// Router.events.on('hashChangeComplete', (url)=>{
//   console.log("hashChangeComplete",url);
// })

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {

  return <>
    <CacheProvider value={emotionCache}>
      <Head>
        {/* テスト環境のページが検索エンジンに登録されることを回避する */}
        <meta name="robots" content="noindex,nofollow"/>

        <title>Daichi Next</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="keywords" content=""/>
        <meta name="description" content=""/>
        <link rel="icon" href="/icon.svg"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="canonical" href=""/>
        <meta name="format-detection" content="telephone=no"/>
        <meta property="og:title" content=""/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content=""/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
        <meta property="og:url" content=""/>
        <meta property="og:description" content=""/>
        <meta property="og:site_name" content=""/>
        <meta property="og:locale" content="ja"/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>

      {/*
        strategy="afterInteractive" を指定すると、useEffectより後にScriptが読み込まれる
        [next/scriptのJavaScriptの基本](https://zenn.dev/aiji42/articles/9a6ab12ab5f6e6)
        */}
      {/*
      <Script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" strategy="beforeInteractive" defer/>
      <Script src="https://maps.googleapis.com/maps/api/js?key=" strategy="beforeInteractive" defer/>
      */}

      {/* <ThemeProvider theme={theme}> */}
        <Provider store={createStore}>
          <Component {...pageProps} />
        </Provider>
      {/* </ThemeProvider> */}
    </CacheProvider>
  </>
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp

declare global {
  interface Window{
    [key: string]: any,
  }
}
