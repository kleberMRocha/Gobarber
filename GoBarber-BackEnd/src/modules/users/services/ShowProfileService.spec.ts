import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import IUserrepositories from '../repositories/IUserrepositories';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import ShowProfileService from '../../users/services/ShowProfileService';

const fakeUserRepository = new FakeUserRepository();
const showProfileService = new ShowProfileService(fakeUserRepository);


describe('ShowProfile', () => {
    it('should be able to show the user profile', async () => {

      const user =  await fakeUserRepository.create({
            email:'2020@javascript.com',
            name:'kleber',
            password:'123'
        });


     const profile =  await  showProfileService.execut({
            user_id:user.id,
        });

        expect(profile.name).toBe('kleber');

    });

    it('should be not able to show the user profile of non existent user', async () => {


        await expect( showProfileService.execut({
              user_id:'user.id',
          })).rejects.toBeInstanceOf(AppError);



      });



});
