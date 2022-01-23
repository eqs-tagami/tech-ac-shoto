import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
// import Script from 'next/script'
import { useForm, Controller } from "react-hook-form";
import Layout from "@components/Layout";

import { css } from '@emotion/react'

const path = 'form'

export type Props = {
  activeStep: number,
}

/**
 * 確認画面からブラウザバックで戻れるようにするため、
 * useStateではなく、動的ルーティングで実装
 */
export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
  const activeStep = (()=>{
    try{
      return params?.step? parseInt(params.step as string) : 0;
    }catch(e){
      return 0;
    }
  })();
  return {props:{activeStep}}
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['1','2'].map(d=>`/contact/${d}`),
    fallback: false
  }
}

const Page: NextPage<Props> = (props) => {
  const router = useRouter();

  const [inputData, setInputData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    // watch,
    // control,
    // reset,
    formState: { errors }
  } = useForm();

  const send = async (data:any) => {
    if(props.activeStep==0){
      // 入力内容を保持
      setInputData(data);
      // 確認画面を表示
      router.push(`/contact/1`);
    }else if(props.activeStep==1){
      // event.preventDefault();
      console.log(inputData);
      
      const res = await fetch(`/api/${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData),
      });
      const result = await res.json();
      console.log(result);

      // 完了画面を表示
      router.push(`/contact/2`);
    }
  }

  useEffect(() => {
    // console.log(props,inputData);
    if(props.activeStep!=0 && !inputData){
      router.replace(`/contact`)
    }else if(props.activeStep==2){
      // 入力内容をクリア
      setInputData(null);
    }
    if (props.activeStep==0 && typeof window !== 'undefined' && 'pageOnload' in window && window.jQuery) {
      window.pageOnload();
      // const $ = window.jQuery;
      // const Swiper = window.Swiper;
    }
  },[props]);

  return (
    <>
      <Head>
        <title>資料請求・お問い合わせ | 葬儀・葬式なら信頼と安心の葬儀社セレモア</title>
      </Head>
      <Layout>
        <div id="pageWrap">
          {/* <Header /> */}
          <article className="contentsArea" id="contents">
            <div className="contact-sec-1">
              <div className="contact-sec-1__inner">
                <div className="blks-1">
                  <div className="heading m-heading-9">
                    <h1 className="m-heading-9__main">お問い合わせ</h1>
                    <p className="m-heading-9__sub">- CONTACT -</p>
                  </div>
                  <ul className="flow m-flow-1">
                    <li className={"m-flow-1__item"+(props.activeStep==0?' m-flow-1__item_active':'')}>入力</li>
                    <li className={"m-flow-1__item"+(props.activeStep==1?' m-flow-1__item_active':'')}>確認</li>
                    <li className={"m-flow-1__item"+(props.activeStep==2?' m-flow-1__item_active':'')}>完了</li>
                  </ul>
                </div>
                {props.activeStep==2
                ?<>
                  <div className="m-defList-1__item">
                    <div className="contact-thanks-msg">
                      {/* <h1>お問い合わせ完了</h1> */}

                      <h1>お問い合わせありがとうございます</h1>

                      <p>この度は、お問い合わせいただきありがとうございます。</p>
                      <p>お送りいただきました内容を確認の上、折り返し担当者よりご連絡させていただきます。</p>
                      <p>数日経過しても連絡がない場合やお急ぎの場合、ご質問やご不明な点がある場合には、お電話にてお問い合わせください。</p>

                      <p>また、ご入力いただいたメールアドレス宛に受付確認メールをお送りしましたのでご確認ください。</p>
                      <p>万が一、確認メールが届いていない場合には、入力いただいたメールアドレスに間違いがあった可能性がございます。メールアドレスをご確認の上、もう一度フォームよりお問い合わせいただくか、お電話にてお問い合わせをお願い申し上げます。</p>
                      
                      {/* <p>今後ともご愛顧賜りますようよろしくお願い申し上げます。</p> */}
                    </div>
                  </div>
                </> 
                :<>
                  <form onSubmit={handleSubmit(send)}>
                    <div className="blks-2">
                      <div className="defList m-defList-1">
                        <dl className="m-defList-1__item">
                          <dt className="m-defList-1__item__ttl">
                            <span>貴社名</span>
                            <span className="m-defList-1__item__ttl__required">必須</span>
                          </dt>
                          <dd className="m-defList-1__item__detail">
                            {props.activeStep==0 && <>
                              <div className="m-inputTxt-1">
                                <input {...register("company", {
                                  required: true,
                                  maxLength: 1000,
                                })} className={errors?.company && "crmr-error"} type="text" />
                              </div>
                              {errors?.company && 
                                <div className="crmr-error-msg">
                                  {errors.company.type === "required" && "貴社名を入力してください。"}
                                  {errors.company.type === "maxLength" && "貴社名は1000文字以内で入力してください。"}
                                </div>
                              }
                            </>}
                            {props.activeStep==1 && <>
                              <div className="crmr-conf-msg">{inputData?.company}</div>
                            </>}
                          </dd>
                        </dl>
                        <dl className="m-defList-1__item">
                          <dt className="m-defList-1__item__ttl">
                            <span>部署名</span>
                            <span className="m-defList-1__item__ttl__required">必須</span>
                          </dt>
                          <dd className="m-defList-1__item__detail">
                            {props.activeStep==0 && <>
                              <div className="m-inputTxt-1">
                                <input {...register("department", {
                                  required: true,
                                  maxLength: 1000,
                                })} className={errors?.department && "crmr-error"} type="text" />
                              </div>
                              {errors?.department && 
                                <div className="crmr-error-msg">
                                  {errors.department.type === "required" && "部署名を入力してください。"}
                                  {errors.department.type === "maxLength" && "部署名は1000文字以内で入力してください。"}
                                </div>
                              }
                            </>}
                            {props.activeStep==1 && <>
                              <div className="crmr-conf-msg">{inputData?.department}</div>
                            </>}
                          </dd>
                        </dl>
                        <dl className="m-defList-1__item">
                          <dt className="m-defList-1__item__ttl">
                            <span>ご担当者名</span>
                            <span className="m-defList-1__item__ttl__required">必須</span>
                          </dt>
                          <dd className="m-defList-1__item__detail">
                            {props.activeStep==0 && <>
                              <div className="m-inputTxt-1">
                                <input {...register("person", {
                                  required: true,
                                  maxLength: 1000,
                                })} className={errors?.person && "crmr-error"} type="text" />
                              </div>
                              {errors?.person && 
                                <div className="crmr-error-msg">
                                  {errors.person.type === "required" && "ご担当者名を入力してください。"}
                                  {errors.person.type === "maxLength" && "ご担当者名は1000文字以内で入力してください。"}
                                </div>
                              }
                            </>}
                            {props.activeStep==1 && <>
                              <div className="crmr-conf-msg">{inputData?.person}</div>
                            </>}
                          </dd>
                        </dl>
                        <dl className="m-defList-1__item">
                          <dt className="m-defList-1__item__ttl">
                            <span>ふりがな</span>
                            <span className="m-defList-1__item__ttl__required">必須</span>
                          </dt>
                          <dd className="m-defList-1__item__detail">
                            {props.activeStep==0 && <>
                              <div className="m-inputTxt-1">
                                <input {...register("kana", {
                                  required: true,
                                  maxLength: 1000,
                                })} className={errors?.kana && "crmr-error"} type="text" />
                              </div>
                              {errors?.kana && 
                                <div className="crmr-error-msg">
                                  {errors.kana.type === "required" && "ふりがなを入力してください。"}
                                  {errors.kana.type === "maxLength" && "ふりがなは1000文字以内で入力してください。"}
                                </div>
                              }
                            </>}
                            {props.activeStep==1 && <>
                              <div className="crmr-conf-msg">{inputData?.kana}</div>
                            </>}
                          </dd>
                        </dl>
                        <dl className="m-defList-1__item">
                          <dt className="m-defList-1__item__ttl">
                            <span>お問い合わせ内容</span>
                            <span className="m-defList-1__item__ttl__required">必須</span>
                          </dt>
                          <dd className="m-defList-1__item__detail">
                            {props.activeStep==0 && <>
                              <div className="m-textarea-1">
                                <textarea {...register("details", {
                                  required: true,
                                  maxLength: 20000,
                                })} className={errors?.details && "crmr-error"}></textarea>
                              </div>
                              {errors?.details && 
                                <div className="crmr-error-msg">
                                  {errors.details.type === "required" && "お問い合わせ内容を入力してください。"}
                                  {errors.details.type === "maxLength" && "お問い合わせ内容は20000文字以内で入力してください。"}
                                </div>
                              }
                            </>}
                            {props.activeStep==1 && <>
                              <div className="crmr-conf-msg">{inputData?.details}</div>
                            </>}
                          </dd>
                        </dl>
                      </div>
                    </div>
                    {props.activeStep==0 && <>
                      <div className="blks-3">
                        <h2 className="heading">個人情報の取扱いについて</h2>
                        <div className="box">
                          <p className="txt">1.基本方針<br />
                            株式会社セレモア（以下、「弊社」といいます）は、お客様の個人情報の重要性を認識し、個人情報の適切な管理を行うことが、弊社の事業活動の基本であると共に、弊社の社会的責務であると考えており、責任を持って個人情報を保護する為、以下の取り組みを行っております。<br />
                            2.個人情報の定義<br />
                            本プライバシーポリシーにおける「個人情報」とは、弊社が取り扱う業務（葬祭関連業務、ご遺体搬送業務、法事・法要、生花・花輪承り業務、仏壇・仏具販売業務、会員制運営業務等、以下、「弊社取り扱い業務」といいます）を通じてお客様からお預かりさせていただく、氏名、住所、電話番号、生年月日、メールアドレス等、お客様個人を識別できる情報を意味します。<br />
                            3.安全管理措置<br />
                            弊社は、お客様よりお預かりさせていただいた個人情報を適切にまた厳正に運用するため、個人情報を厳重に保管・管理し、第三者の不正なアクセスによる個人情報の漏洩・流用・改ざん及び紛失等を防止するセキュリティ対策を講じています。<br />
                            4.組織体制<br />
                            弊社は、個人情報の取扱いに関する規程に基づき、各部署に個人情報管理責任者を任命し、弊社内における個人情報保護を遵守するための組織体制を整備しております。<br />
                            5.利用目的<br />
                            弊社は、弊社取り扱い業務におけるサービス及び商品の提供、アドバイザーとしてのご案内、社内業務処理等を行うために利用いたします。また、弊社は、業務を円滑に進めるため、業務の一部を委託し、委託先に対して必要な範囲で個人情報を提供することがありますが、この場合、弊社は業務委託先との間で取り扱いに関する契約の締結をはじめ適切な監督を行います。<br />
                            6.第三者への非公開<br />
                            弊社は、お客様の個人情報を第三者に対して開示もしくは提供いたしません。ただし、次のいずれかの場合は開示もしくは提供することがあります。<br />
                            1.お客様の同意がある場合。<br />
                            2.弊社取り扱い業務に関連し、アドバイザー業務の一環としてお客様の個人情報を記載した書面を業務提携している企業（デパート、ギフト専門店、墓地・墓石専門店等、以下「提携企業」といいます）に送付して提供する場合。<br />
                            なお、お客様が提携企業からのご案内を希望されない場合は、弊社にご連絡いただければ速やかに提供を停止いたします。<br />
                            3.統計的なデータなど本人を識別できない状態で開示・提供する場合。<br />
                            4.法令に定めのある場合。<br />
                            7.共同利用<br />
                            弊社がお預かりさせていただいている個人情報は、弊社のグループ会社が関連する事業のサービス・商品の提供及び情報提供のために共同利用させていただく場合がございます。この場合、弊社が責任をもって個人情報を管理いたします。<br />
                            8.正確性の確保<br />
                            お客様の個人情報は、正確かつ最新の状態を保つよう、適正な措置を講じております。<br />
                            9.個人情報の開示・訂正・削除<br />
                            弊社がお預かりするお客様の個人情報に関して、照会、訂正、削除等をご希望される場合には、速やかに対応させていただきます。<br />
                            10.関係法令、ガイドライン等の遵守<br />
                            弊社が保有する個人情報に関して適用される法令、ガイドライン及び規範等を遵守するとともに、本プライバシーポリシーにおける取り組みを適宜見直し、改善に努めます。<br />
                            11.個人情報に関するお問い合わせ窓口<br />
                            個人情報に関するお問い合わせは、下記窓口までお願い申し上げます。<br />
                            <br />
                            株式会社セレモア　個人情報管理担当<br />
                            フリーダイヤル　0120-470-470
                          </p>
                        </div>
                      </div>
                    </>}
                    <div className="blks-4">
                      {props.activeStep==0 && <>
                        <p className="submit m-btn-6">
                          <button type="submit">入力内容を確認する</button>
                        </p>
                      </>}
                      {props.activeStep==1 && <>
                        <p className="submit m-btn-6">
                          <div className="conf-buttons">
                            <div className="u-hide-sp">
                              <Link href={`/contact`}>
                                <a><img src="/img/cmn/cmn_arr15.svg"/><span>入力に戻る</span></a>
                              </Link>
                            </div>
                            <div className="u-hide-pc">
                              <Link href={`/contact`}>
                                <a><img src="/img/cmn/cmn_arr15.svg"/><span>戻る</span></a>
                              </Link>
                            </div>
                            <button type="submit">送信する</button>
                          </div>
                        </p>
                      </>}
                    </div>
                  </form>
                </>}
              </div>
            </div>
          </article>
          {/* <Footer /> */}
        </div>
      </Layout>
    </>
  )
}

export default Page

declare global {
  interface Window{
    [key: string]: any,
  }
}
