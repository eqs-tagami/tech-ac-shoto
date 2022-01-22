# Next.jsへの変換

## エクセルデータをインポートしてDynamoDBに保存する

```bash
npm run import_hall
```

## 近隣の葬儀場をDynamoDBに保存する

```bash
node import_nearby.js
```

## common.jsの修正

`function pageOnload(){}` で囲う

下記を追記
```
$('.js-modalTgt a').on('click', function(){
  $body.removeClass('is-fixed');
});
```

## sougiou/search.tsxの修正

- マップの東京多摩地区と東京23区のdata-modal-indexが逆になっているので修正

- モーダルを下記に書き換え
```
{props.pref?<>
  <AreaModal dataModalIndex="1" areas={props.pref.saitama}/>
  <AreaModal dataModalIndex="2" areas={props.pref.yamanashi}/>
  <AreaModal dataModalIndex="3" areas={props.pref.tokyo}/>
  <AreaModal dataModalIndex="4" areas={props.pref.tama}/>
  <AreaModal dataModalIndex="5" areas={props.pref.kanagawa}/>
  <AreaModal dataModalIndex="6" areas={props.pref.chiba}/>
</>:<></>}
```

## sougijou/[pref]/[area].tsxの修正

- パンくずリストの修正
```
<li className="list__item"><Link href="/"><a>セレモア</a></Link></li>
<li className="list__item"><Link href="/sougijou/search"><a>葬儀場を探す</a></Link></li>
<li className="list__item"><Link href={`/sougijou/${props.area?.prefId}`}><a>{props.area?.prefName}{props.area?.areaName? '' : 'の葬儀場'}</a></Link></li>
{props.area?.areaName? <li className="list__item">{props.area.areaName}の葬儀場</li>: ''}
```
