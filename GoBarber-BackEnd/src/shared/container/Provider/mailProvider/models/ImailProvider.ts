import ISendMailProvider from '../Dtos/ISendMailProvider';

export default interface IMailprovider{
    sendMail(data:ISendMailProvider):Promise<void>;
}
