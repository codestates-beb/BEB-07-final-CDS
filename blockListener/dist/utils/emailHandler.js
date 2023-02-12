"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.sendEmail = void 0;
// event와 address 기준으로 파싱한다.
// tx가 이미 이메일로 처리되었으면 종료한다.
// 관련있는 유저의 이메일 주소 등록 여부를 판별한다.
// 이벤트 종류별로 정해진 템플릿에 따라 이메일을 발송한다.
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const getEnv_1 = __importDefault(require("./getEnv"));
//TODO: remove on production
// import path from 'path';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
aws_sdk_1.default.config.update({
    accessKeyId: (0, getEnv_1.default)('SES_ACCESS_KEY'),
    secretAccessKey: (0, getEnv_1.default)('SES_SECRET_KEY'),
    region: 'ap-northeast-2',
});
function sendEmail(subject, message, recipients) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const from = 'atoye@knou.ac.kr';
            let to = [];
            if (!subject || !message || !recipients) {
                return;
            }
            if (typeof recipients === 'string') {
                to.push(recipients);
            }
            else {
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
            const sendResult = yield new aws_sdk_1.default.SES({ apiVersion: '2010-12-01' })
                .sendEmail(params)
                .promise();
            console.log(sendResult);
            return sendResult;
        }
        catch (err) {
            console.error(err);
            return;
        }
    });
}
exports.sendEmail = sendEmail;
function createMessage(emailData) {
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
exports.createMessage = createMessage;
//# sourceMappingURL=emailHandler.js.map