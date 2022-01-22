

import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useState, useEffect } from 'react';

type Props = {
  slug: string;
  article: Article;
}
type Article = {
  title: string
  user: {
    id: string
  }
}
function useCurrentUser(){
  return {
    currentUser: {
      id: 'id'
    }
  }
}
function getArticle(params:{slug:string}){
  return {
    article: {
      title: 'title',
      user: {
        id: 'id'
      }
    }
  }
}

// 開発環境（npm run dev あるいは yarn dev）では、getStaticProps は毎回のリクエストごとに実行されます。
// 本番環境では、getStaticProps はビルド時にのみ実行されます。
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const { article } = await getArticle({ slug }); // 記事のデータをAPIから取得
  return {
    props: {
      slug,
      article
    },
    // getStaticPropsの返り値にrevalidateを含めるとISRが実装される。
    // 3秒経ったあとはキャッシュが古くなったとみなされる。ただし次のリクエストでも一旦はそのキャッシュを返す。
    //（1時間後にアクセスがあった場合も一旦古いキャッシュを返す）
    //その裏でキャッシュを再生成する。
    //その次のリクエストでは再生成されたキャッシュを返す。
    revalidate: 3,
  };
};

// リクエスト時に外部データを取得して、サーバサイドレンダリング
// ・基本的にSSRをするとコードが複雑になるので、避けられるなら避けるべき。
// ・SSRが必要なのはSEOを意識するWebページだけ。
// ・SEOが不要なページであれば、認証ありなAPIコールは全てブラウザ上で行えば良い。
// 認証が必要なページはSEOに関係なく、頻繁に更新されるデータはレンダリング時よりも
// ブラウザ上でAPIコールして随時更新した方が良いので、SSRでデータ取得を行うのはやめた方が良い
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すための props
//     }
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    // アプリのビルド時にはパスに何が入るかが分からないので空でOK
    paths: [],
    // キャッシュがまだ作られていないときはSSRを行う。
    // 指定しなかった場合、初回リクエストにはSPAのような動きになります。
    fallback: 'blocking',
  };
};

const Page: NextPage<Props> = (props) => {
  const [article, setArticle] = useState<Article>(props.article)
  const { currentUser } = useCurrentUser(); // 認証周りのカスタムフック
  const isMine = currentUser && currentUser.id === props.article.user.id;
  const slug = props.slug;

  // 著者本人なら改めてフェッチして最新のデータを表示する
  useEffect(() => {
    if (isMine === false) return;
    (async function () {
      try {
        const data = await getArticle({ slug });
        setArticle(data.article);
      } catch (err) {
        // エラーハンドリング
      }
    })();
  }, [isMine, slug])

  return <div>{article.title}</div>
}

export default Page;