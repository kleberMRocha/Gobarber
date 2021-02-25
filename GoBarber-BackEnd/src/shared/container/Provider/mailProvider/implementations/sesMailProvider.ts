import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import ImailProvider from '../models/ImailProvider';
import mail from '../../../../../config/mail';
import {inject,injectable} from 'tsyringe';
import ITemplateEmailProvider from '../../MailtempleteProvider/models/IMailProvider';

import ISendMailProvider from '../Dtos/ISendMailProvider';

@injectable()
export default class SESMailProvider implements ImailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: ImailProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templete,
  }: ISendMailProvider): Promise<void> {
    const { email, name } = mail.default.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
    //   html: await this.mailTemplateProvider
    });
  }
}


