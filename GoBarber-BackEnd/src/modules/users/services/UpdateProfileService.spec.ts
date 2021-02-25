import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import FakeHashProvider from '../providers/hashprovider/fakes/fakeHashProvider';

const fakeUserRepository = new FakeUserRepository();
const fakeHashProvider = new FakeHashProvider();
const updateProfileService = new UpdateProfileService(fakeUserRepository,fakeHashProvider);

describe('UpdateProfile', () => {
    it('should be able to Update the profile', async () => {

        const user = await fakeUserRepository.create({
                 email:'update2020@test.com.br',
                 name:'kleber',
                 password:'1214545'
        });


       const updatedUser = await updateProfileService.execut({
            user_id:user.id,
            email:'teste@teste.com',
            name:'kleber2',
            old_password:user.password,
            password:'new'
        });

        expect(updatedUser.name).toBe('kleber2');
        expect(updatedUser.email).toBe('teste@teste.com');


    });
    it('should not be able to update an email that already exists in the database', async () => {

       await fakeUserRepository.create({
                 email:'exists@test.com.br',
                 name:'kleber',
                 password:'1214545'
        });

        const user = await fakeUserRepository.create({
            email:'outher@test.com.br',
            name:'kleber',
            password:'1214545'
         });


       await expect(
        updateProfileService.execut({
            user_id:user.id,
            email:'exists@test.com.br',
            name:'kleber2',
            old_password:user.password,
            password:'00000'
        })
       ).rejects.toBeInstanceOf(AppError);


    });

    it('should be able to update the password', async () => {

         const user = await fakeUserRepository.create({
             email:'xxx@test.com.br',
             name:'kleber',
             password:'oldPassword'
          });


          const updatedUser = await updateProfileService.execut({
            user_id: user.id,
            name: 'John',
            email: 'johntre@example.com',
            old_password:user.password,
            password: 'newPassword',
         });

         expect(updatedUser.password).toBe('newPassword');


     });

     it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        });

        await expect(
          updateProfileService.execut({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password:'123456',
            password: '123123',

          }),
        ).rejects.toBeInstanceOf(AppError);
      });

      it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUserRepository.create({
          name: 'John Doe',
          email: 'wrong@example.com',
          password: '123456',
        });

        await expect(
          updateProfileService.execut({
            user_id: user.id,
            name: 'John Trê',
            email: 'wrong@example.com',
            old_password: 'wrong-old-password',
            password: '123123',
          }),
        ).rejects.toBeInstanceOf(AppError);
      });


});
