import {container} from 'tsyringe';

import IHashProvider from './hashprovider/models/IHashProvider';

import BCryptHashProvider from '../providers/hashprovider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('hashProvider', BCryptHashProvider);
