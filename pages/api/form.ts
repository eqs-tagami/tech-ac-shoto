import { createTransport } from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  
  //--- バリデーション処理 ---//

  
  //--- メール配信 ---//
  const subject = 'テスト送信';
  const mailBody = `テスト送信です
  貴社名: ${req.body.company}
  部署名: ${req.body.department}
  ご担当者名: ${req.body.person}
  ふりがな: ${req.body.kana}
  お問い合わせ内容: 
  ${req.body.details}
  `
  console.log(mailBody);

  // const transporter = createTransport({
  //   host: 'dc65.etius.jp',
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: 'test@eqs.jp',
  //     pass: process.env.MAIL_PASS,
  //   },
  // });
  // await transporter.sendMail({
  //   from: 'test@eqs.jp',
  //   to: 'test@eqs.jp',
  //   subject,
  //   text: mailBody,
  // });

  res.status(200).json({
    success: true,
  });
};