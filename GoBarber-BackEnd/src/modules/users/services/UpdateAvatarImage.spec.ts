import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import UpdateAvatarImage from './UpdateAvatarImage';
import IStorageProvider from '../../../shared/container/Provider/storageProvider/models/IStorageProvider';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import FakeStorangeProvider from '../../../shared/container/Provider/storageProvider/fakes/fakeStorangeProvider';

const fakeStorangeProvider = new FakeStorangeProvider();
const fakeUserRepository = new FakeUserRepository();

const deleteFile = jest.spyOn(fakeStorangeProvider, 'deleteFile');

const updateAvatarImage = new UpdateAvatarImage(
    fakeUserRepository,
    fakeStorangeProvider
    );

describe('UpdateUserAvatar', () => {
    it('should be able to update an avatar from a user', async () => {

           const user = await  fakeUserRepository.create({
                    email:'kleber@test.com.br',
                    name:'kleber',
                    password:'1214545'
           });

         await updateAvatarImage.execut(
                 {
                    userId: user.id,
                    fileName:'minha_foto.jpg'
                 }
          );

       expect(user.avatar).toBe('minha_foto.jpg');
    });
    it('should not be able to update an avatar of a non-existent user', async () => {

        const user = await  fakeUserRepository.create({
                 email:'kleber@test.com.br',
                 name:'kleber',
                 password:'1214545'
        });

       await expect(

        updateAvatarImage.execut(
            {
               userId: 'wrong_id',
               fileName:'minha_foto.jpg'
            }
        )).rejects.toBeInstanceOf(AppError);
 });

 it('should delete a old avatar when updating new one', async () => {

    const user = await  fakeUserRepository.create({
             email:'kleber@test.com.br',
             name:'kleber',
             password:'1214545'
    });


   await updateAvatarImage.execut(
        {
           userId: user.id,
           fileName:'minha_foto.jpg'
        }
    )

   await updateAvatarImage.execut(
        {
           userId: user.id,
           fileName:'minha_foto2.jpg'
        }
    )


    expect(deleteFile).toHaveBeenCalledWith('minha_foto.jpg');
    expect(user.avatar).toBe('minha_foto2.jpg');

});

});
