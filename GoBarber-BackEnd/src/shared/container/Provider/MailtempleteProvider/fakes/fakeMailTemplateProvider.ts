import IMailProvider from '../models/IMailProvider';
import IMailParseTemplateDto from '../dto/IMailParseTemplateDto';

class fakeMailTemplateProvider implements IMailProvider{
   public async parseTemplete({file,variables}:IMailParseTemplateDto):Promise<string>{
       return 'template';

   }
}

export default fakeMailTemplateProvider;
