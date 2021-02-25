import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import CreateSession from './CreateSession';
import CreateUser from './createUser';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/hashprovider/fakes/fakeHashProvider';
import FakechacePovider from '../../../shared/container/Provider/CacheProvider/fakes/fakeCacheProvider';


const fakeUserRepository = new FakeUserRepository();
const fakeHashProvider = new FakeHashProvider();
const fakechacePovider = new FakechacePovider();

const createSession = new CreateSession(fakeUserRepository, fakeHashProvider);

const createUser = new CreateUser(fakeUserRepository, fakeHashProvider, fakechacePovider);

const {email,password,name } = {
    email:'kleber@test.com.br',
    name:'kleber',
    password:'1214545'
}

describe('CreateSession', () => {
    it('should be able to auth a user', async () => {

       const user = await createUser.execut({email,password,name});
       const response = await createSession.execut({

        email:'kleber@test.com.br',
        password:'1214545'

       });

       expect(response).toHaveProperty('token');
       expect(response.user).toEqual(user);
     });

     it('should not be able to authenticate a user with an incompatible password', async () => {

        await expect(
         createSession.execut({

                email:'kleber@test.com.br',
                password:'xxxxxxxxx'

            })
        ).rejects.toBeInstanceOf(AppError);

     })

     it('should not be able to authenticate a user that does not exist', async () => {


        await expect(
            createSession.execut({
              email: 'johndoe@example.com',
              password: '123456',
            }),
          ).rejects.toBeInstanceOf(AppError);


     });


});
