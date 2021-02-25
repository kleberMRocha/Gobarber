import handlebars from 'handlebars';
import IMailProvider from '../models/IMailProvider';
import IMailParseTemplateDto from '../dto/IMailParseTemplateDto';
import fs from 'fs';

class HandleBarsMailTempleteProvider implements IMailProvider{
   public async parseTemplete({file,variables}:IMailParseTemplateDto):Promise<string>{

        const templeteFileContent = await fs.promises.readFile(file,{
            encoding:'utf-8'
        })
      const parseTemplete = handlebars.compile(templeteFileContent);

      return parseTemplete(variables);

   }
}

export default HandleBarsMailTempleteProvider;
