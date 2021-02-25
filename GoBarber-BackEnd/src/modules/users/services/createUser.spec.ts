import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import CreateUser from './createUser';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/hashprovider/fakes/fakeHashProvider';
import FakechacePovider from '../../../shared/container/Provider/CacheProvider/fakes/fakeCacheProvider';

const fakeUserRepository = new FakeUserRepository();
const fakeHashProvider = new FakeHashProvider();
const fakechacePovider = new FakechacePovider();

describe('CreateUser', () => {
    it('should be able to create a new User', async () => {


       const createUser = new CreateUser(fakeUserRepository, fakeHashProvider, fakechacePovider);

       const user = await createUser
       .execut({
                email:'kleber@test.com.br',
                name:'kleber',
                password:'1214545'
       });

       expect(user).toHaveProperty('id');
       expect(user.name).toBe('kleber');
    });


    it('should not be able to create a new User if hes already exists', async () => {

        const fakeUserRepository = new FakeUserRepository();
        const createUser = new CreateUser(fakeUserRepository, fakeHashProvider, fakechacePovider);

        await createUser
        .execut({
                 email:'kleber@test.com.br',
                 name:'kleber',
                 password:'1214545'
        });

        await expect(
        createUser.execut({
                 email:'kleber@test.com.br',
                 name:'kleber',
                 password:'1214545'
        })
        ).rejects.toBeInstanceOf(AppError);

     });


});
