import IMailParseTemplateDto from '../../MailtempleteProvider/dto/IMailParseTemplateDto';

interface IMailContact{
    name:string;
        email:string;
}

export default interface ISendEmailDto{
    to:IMailContact;
    from?:IMailContact;
    subject:string;
    templete:IMailParseTemplateDto;

}
