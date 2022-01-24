import createCache, { EmotionCache } from '@emotion/cache';

// https://github.com/mui-org/material-ui/blob/master/examples/nextjs/src/createEmotionCache.js
// prepend:true MUIスタイルを<head>の先頭に移動させ、最初に読み込まれるようにします。
// これにより、開発者はCSSモジュールのような他のスタイリングソリューションでMUIスタイルを簡単にオーバーライドすることができます。
export default function createEmotionCache() {
  return createCache({ key: 'css'/*, prepend: true*/ });
}
