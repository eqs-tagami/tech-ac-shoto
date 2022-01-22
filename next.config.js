/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const withTM = require('next-transpile-modules')([
  "@mui/material",
  // "@mui/core",
  "@mui/base",
  "@mui/system",
  "@mui/utils",
  // "@mui/icons-material",
  "@mui/private-theming",
  "@mui/styled-engine",
  "@popperjs/core",
  "@emotion/react",
  "@emotion/styled",
  "react-hook-form",
  // "swiper",
  // "dom7",
  // "ssr-window",
])
const withPlugins = require('next-compose-plugins')


module.exports = withPlugins([
  withTM,
], (phase, { defaultConfig }) => {
  const config = {
    images: {
      formats: [
        'image/avif',
        'image/webp'
      ],
      domains: [
        'd35coylnm42s2l.cloudfront.net',
      ],
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...config,
      // 開発フェーズでのみ利用するオプションを設定
      // ...{
        // アプリケーションの潜在的な問題をハイライトする
        // 安全でないライフサイクル、レガシーなAPIの使用、その他多くの機能を識別するのに役立ちます
        // reactStrictMode: true,
        // env: {
        //   GOOGLE_MAP_API_KEY: ''
        // }
      // }
    }
  }else{
    return {
      ...config,
      // 開発フェーズを除く全てのフェーズで有効なオプションを設定
      // ...{
      //   env: {
      //     GOOGLE_MAP_API_KEY: ''
      //   }
      // }
    }
  }
});