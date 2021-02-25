import {container} from 'tsyringe';

import './Provider/index';
import '../../modules/users/providers/index';

import IApointimentsRepository from '../../modules/appointments/repositories/IApointimentsRepository';
import appointmentsRepository from '../../modules/appointments/infra/typeorm/repositories/appointmentsRepository';

import IUserrepositories from '../../modules/users/repositories/IUserrepositories';
import userRepository from '../../modules/users/infra/typeorm/repositories/userRepository';

import IUserToken from '../../modules/users/repositories/IUserToken';
import userToken from '../../modules/users/infra/typeorm/repositories/userTokenRepository';

import INotificationsRepository from '../../modules/notifications/repositorires/INotificationsRepository';
import notificationsRepository from '../../modules/notifications/infra/typeorm/repositories/notificationsRepository';

import RedisCacheProvider from './Provider/CacheProvider/implementations/RedisCacheProvider';
import ICacheProvider from './Provider/CacheProvider/models/ICacheProvider';


container
.registerSingleton<IApointimentsRepository>('appointmentsRepository',appointmentsRepository);

container
.registerSingleton<IUserrepositories>('userRepository',userRepository);

container
.registerSingleton<IUserToken>('userToken',userToken);

container
.registerSingleton<INotificationsRepository>('notificationsRepository',notificationsRepository);

const provider = {
    redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider',provider.redis);
