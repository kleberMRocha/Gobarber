import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fake/fakeUserTokenRepository';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import SendForgotPasswordEmailService from './sendForgotPasswordEmailService';
import FakeHashProvider from '../providers/hashprovider/fakes/fakeHashProvider';
import FakeMailProvider from '../../../shared/container/Provider/mailProvider/fakes/fakeMailProvider';
import ResetPassword from '../services/resetPasswordService';


const fakeUserRepository = new FakeUserRepository();
const fakeMailProvider = new FakeMailProvider();
const fakeUserTokenRepository = new FakeUserTokenRepository();
const fakeHashProvider = new FakeHashProvider();

const resetPassword = new ResetPassword(fakeUserRepository,fakeUserTokenRepository,fakeHashProvider);

const fakeSendForgotPassword = new SendForgotPasswordEmailService(
    fakeUserRepository,
    fakeMailProvider,
    fakeUserTokenRepository
    );


const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');


describe('ResetService', () => {
    it('should be able reset the password ', async () => {

        const user = await fakeUserRepository.create({
            email:"kleber7@gmail.com",
            name:'kleber',
            password: '784512'
        });


       const usertoken = await fakeUserTokenRepository.generate(user.id);

       const updatedHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execut({password:"123456", token:usertoken.token});

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123456');
        expect(updatedHash).toHaveBeenCalledWith('123456');

    });

    it('should not be able to reset a password whith a non-existent token', async () => {

       await expect(
            resetPassword.execut({
                password:'xxxxxx',
                token:'xxxxxx'
            })
        ).rejects.toBeInstanceOf(AppError);


    });

    it('should not be able to reset a password whith a non-existent user', async () => {
       const {token} = await fakeUserTokenRepository.generate('??????');

        await expect(
             resetPassword.execut({
                 password:'xxxxxx',
                 token:token
             })
         ).rejects.toBeInstanceOf(AppError);


     });

     it('should not be able to reset a password whith ', async () => {
        const {token} = await fakeUserTokenRepository.generate('??????');

         await expect(
              resetPassword.execut({
                  password:'xxxxxx',
                  token:token
              })
          ).rejects.toBeInstanceOf(AppError);


      });

      it('should be not able to reset the password with an expired token', async () => {

        const user = await fakeUserRepository.create({
            email:"kleber7777@gmail.com",
            name:'kleber',
            password: '7777777'
        });

        const {token} = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3)
        });

       await expect(resetPassword.execut({password:user.password,token}))
        .rejects.toBeInstanceOf(AppError);



      });



});
