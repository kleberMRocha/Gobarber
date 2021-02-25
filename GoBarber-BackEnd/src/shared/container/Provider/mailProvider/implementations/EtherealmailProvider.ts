import ImailProvider from '../models/ImailProvider';

import {inject,injectable} from 'tsyringe';
import ITemplateEmailProvider from '../../MailtempleteProvider/models/IMailProvider';

import nodemailer, {Transporter} from 'nodemailer';
import ISendMailProvider from '../Dtos/ISendMailProvider';

@injectable()
export default class EtherealMailpovider implements ImailProvider{
    private client: Transporter;
    constructor(
        @inject('handleBarsMailTempleteProvider')
        private mailTemplateProvider:ITemplateEmailProvider,
    ){
        nodemailer.createTestAccount().then(account => {

            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;

        })
    }


    public async sendMail({to,subject, from, templete}:ISendMailProvider):Promise<void>{
        console.log({to,subject, from, templete});
       const message = await this.client.sendMail({
            from: {
              name:from?.name || 'Equipe GoBarber',
              address:from?.email || 'equipe@gobarber.com.br'

            },
            to:{
                name: to.name,
                address: to.email
            },
            subject,
            html: await this.mailTemplateProvider.parseTemplete(templete),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}


