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
exports.default = sendEmail;
//TODO: remove on production
// sendEmail(
//   'CDS_TEST_SUBJECT',
//   'CDS_TEST_CONTENT\nHello User!',
//   'atoye@knou.ac.kr',
// );
//# sourceMappingURL=sendMail.js.map