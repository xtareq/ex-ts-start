
export interface SendGridAttachMent{
    content: any 
    filename: string
    type:string
    disposition: string
}

export interface SMTPAttachMent{
    content: any 
    filename: string
    contentType:string
    encoding?: string
    path?:string 
}


export interface SmtpConfig{
    host:string
    port:number
    secure: boolean
    auth:{
        user:string
        password:string
    }
}
export interface SMTPOption{
    test: boolean
    html: string
    subject: string
    sender: string
    receiver: string
    config?: SmtpConfig
    attachments?: SMTPAttachMent[]
}
export interface SendGridOption{
    html: string
    subject: string
    sender: string
    receiver: string
    apiKey: string
    attachments?: SendGridAttachMent[]
}

export * from './Mailer'