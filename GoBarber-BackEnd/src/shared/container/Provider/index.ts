import {container} from 'tsyringe';
import mail from '../../../config/mail';

import DiskStorageProvider from '../Provider/storageProvider/implementations/diskStorageProvider';
import IStorageProvider from './storageProvider/models/IStorageProvider';

import IMailProvider from './mailProvider/models/ImailProvider';
import EtherealmailProvider from './mailProvider/implementations/EtherealmailProvider';
import SesMailProvider from './mailProvider/implementations/sesMailProvider';

import IMailTemplateProvider from './MailtempleteProvider/models/IMailProvider';
import HandleBarsMailTempleteProvider from './MailtempleteProvider/implementetions/HandleBarsMailTempleteProvider';


container.registerSingleton<IStorageProvider>(
'storageProvider', DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
    'handleBarsMailTempleteProvider', HandleBarsMailTempleteProvider
);

container.registerInstance<IMailProvider>(
    'EtherealmailProvider',
    mail.driver === 'ethereal'
    ? container.resolve( EtherealmailProvider)
    : container.resolve( SesMailProvider)

);


