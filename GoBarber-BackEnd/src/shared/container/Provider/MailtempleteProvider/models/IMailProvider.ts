import IMailParseTemplateDto from '../dto/IMailParseTemplateDto';

export default interface ImailProvider{

    parseTemplete(data:IMailParseTemplateDto):Promise<string>;
}
