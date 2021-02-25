import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';

import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import ListProviders from './ListProvidersService';
import FakechacePovider from '../../../shared/container/Provider/CacheProvider/fakes/fakeCacheProvider';


const fakeUserRepository = new FakeUserRepository();
const fakechacePovider = new FakechacePovider();

const listProviders = new ListProviders(fakeUserRepository, fakechacePovider);




describe('listProviders', () => {
    it('should be able to show the providers', async () => {

      const user1 =  await fakeUserRepository.create({
            email:'user1@gmail.com',
            name:'user1',
            password:'123456'
        });

      const user2  =  await fakeUserRepository.create({
            email:'user2@gmail.com',
            name:'user2',
            password:'123456'
        });

      const logedUser =  await fakeUserRepository.create({
            email:'logedUser@gmail.com',
            name:'logedUser',
            password:'123456'
        });


      const providers = await listProviders.execut({user_id:logedUser.id});

      expect(providers).toEqual([user1,user2]);

    });


});
