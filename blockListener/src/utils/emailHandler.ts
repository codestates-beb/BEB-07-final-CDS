// event와 address 기준으로 파싱한다.
// tx가 이미 이메일로 처리되었으면 종료한다.
// 관련있는 유저의 이메일 주소 등록 여부를 판별한다.
// 이벤트 종류별로 정해진 템플릿에 따라 이메일을 발송한다.
import AWS from 'aws-sdk';
import { EventData } from 'aws-sdk/clients/ssmincidents';
import { EmailData } from '../types/CDSTypes';
import getEnv from './getEnv';
//TODO: remove on production
// import path from 'path';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

AWS.config.update({
  accessKeyId: getEnv('SES_ACCESS_KEY'),
  secretAccessKey: getEnv('SES_SECRET_KEY'),
  region: 'ap-northeast-2',
});

export async function sendEmail(
  subject: string,
  message: string,
  recipients: string | string[],
) {
  try {
    const from = 'atoye@knou.ac.kr';
    let to: string[] = [];
    if (!subject || !message || !recipients) {
      return;
    }
    if (typeof recipients === 'string') {
      to.push(recipients);
    } else {
      to = [...recipients];
    }
    let params = {
      Destination: {
        CcAddresses: [from],
        ToAddresses: [...to],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: message,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: from,
      ReplyToAddresses: [from],
    };

    const sendResult = await new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(params)
      .promise();
    console.log(sendResult);
    return sendResult;
  } catch (err) {
    console.error(err);
    return;
  }
}

export function createMessage(emailData: EmailData): string {
  const swapURI = `https://dubnjq842z47s.cloudfront.net/swaps/${emailData.swapId}`;
  const txURI = `http://snowdelver.iptime.org:48080/transactions/${emailData.txHash}`;
  return `Dear ${emailData.nickname}
  You just triggered ${emailData.event} Event on ${emailData.timestamp}
  swapId: ${emailData.swapId}
  txHash : ${emailData.txHash}
  swapInfo : ${swapURI}
  txInfo : ${txURI}
  `;
}
