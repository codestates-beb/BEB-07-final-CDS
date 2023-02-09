import AWS from 'aws-sdk';
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

async function sendEmail(
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

export default sendEmail;

//TODO: remove on production
// sendEmail(
//   'CDS_TEST_SUBJECT',
//   'CDS_TEST_CONTENT\nHello User!',
//   'atoye@knou.ac.kr',
// );
