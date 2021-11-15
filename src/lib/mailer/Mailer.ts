import nodeMailer from 'nodemailer'
import sendGrid from '@sendgrid/mail'
import { SendGridOption, SMTPOption } from '.';


export class Mailer {
    _agent: string
    constructor(agent: string) {
        this._agent = agent
    }
    async sendWithSMTP(option: SMTPOption) {
        try {
            console.log("Ignite nodemailer...");

            const config = option?.config
            const mailer = nodeMailer.createTransport({
                host: option.test ? "smtp.mailtrap.io" : config?.host,
                port: option.test ? 2525 : config?.port,
                secure: option.test ? false : config?.secure,
                auth: {
                    user: option.test ? "258e4e11eba249" : config?.auth.user,
                    pass: option.test ? "99f41926768b6f" : config?.auth.password
                }
            })

            const info = await mailer.sendMail({
                from: option.sender,
                to: option.receiver,
                subject: option.subject,
                text: option.html,
                html: option.html,
                attachments: option.attachments ? option.attachments : []
            })
            console.log("Preview URL: %s", nodeMailer.getTestMessageUrl(info));
        } catch (error) {
            console.log(error)
        }


    }

    async sendWithSendgrid(option: SendGridOption) {

        try {
            sendGrid.setApiKey(option.apiKey)
            const message = {
                to: option.receiver,
                from: option.sender,
                subject: option.subject,
                text: option.html,
                attachments: option.attachments ? option.attachments : []
            }
            await sendGrid.send(message)
        } catch (error) {
            console.log(error)
        }
    }


    async send(option: any) {
        if (this._agent === "smtp") {
            return this.sendWithSMTP(option)
        }

        if (this._agent === "sendgrid") {
            return this.sendWithSendgrid(option)
        }

        return;

    }
}

