import ImailProvider from '../models/ImailProvider';
import ISendMailDto from '../Dtos/ISendMailProvider';

export default class FakeMailProvider implements ImailProvider{
    private message: ISendMailDto[] = [];

  public async sendMail(message:ISendMailDto):Promise<void>{

        this.message.push(message);

    }

}
