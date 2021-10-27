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
exports.Mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
class Mailer {
    constructor(agent) {
        this._agent = agent;
    }
    sendWithSMTP(option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Ignite nodemailer...");
                let config = option === null || option === void 0 ? void 0 : option.config;
                let mailer = nodemailer_1.default.createTransport({
                    host: option.test ? "smtp.mailtrap.io" : config === null || config === void 0 ? void 0 : config.host,
                    port: option.test ? 2525 : config === null || config === void 0 ? void 0 : config.port,
                    secure: option.test ? false : config === null || config === void 0 ? void 0 : config.secure,
                    auth: {
                        user: option.test ? "258e4e11eba249" : config === null || config === void 0 ? void 0 : config.auth.user,
                        pass: option.test ? "99f41926768b6f" : config === null || config === void 0 ? void 0 : config.auth.password
                    }
                });
                let info = yield mailer.sendMail({
                    from: option.sender,
                    to: option.receiver,
                    subject: option.subject,
                    text: option.html,
                    html: option.html,
                    attachments: option.attachments ? option.attachments : []
                });
                console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendWithSendgrid(option) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                mail_1.default.setApiKey(option.apiKey);
                let message = {
                    to: option.receiver,
                    from: option.sender,
                    subject: option.subject,
                    text: option.html,
                    attachments: option.attachments ? option.attachments : []
                };
                yield mail_1.default.send(message);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    send(option) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._agent == "smtp") {
                return yield this.sendWithSMTP(option);
            }
            if (this._agent == "sendgrid") {
                return yield this.sendWithSendgrid(option);
            }
            return;
        });
    }
}
exports.Mailer = Mailer;
