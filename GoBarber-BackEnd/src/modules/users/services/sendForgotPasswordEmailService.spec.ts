import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fake/fakeUserTokenRepository';
import FakeUserRepository from '../../users/repositories/fake/FakeUserRepository';
import SendForgotPasswordEmailService from './sendForgotPasswordEmailService';
import FakeMailProvider from '../../../shared/container/Provider/mailProvider/fakes/fakeMailProvider';

const fakeUserRepository = new FakeUserRepository();
const fakeMailProvider = new FakeMailProvider();
const fakeUserTokenRepository = new FakeUserTokenRepository();

const fakeSendForgotPassword = new SendForgotPasswordEmailService(
    fakeUserRepository,
    fakeMailProvider,
    fakeUserTokenRepository
    );


const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

describe('sendForgotPasswordEmailService.spec', () => {
    it('should be able recover his password using the email ', async () => {

        await fakeUserRepository.create({
            email:"kleber1@gmail.com",
            name:'kleber',
            password: '784512'
        });

        await fakeSendForgotPassword.execut({
            email:"kleber1@gmail.com"
        });


        expect(sendMail).toBeCalled();

    });

    it('should not be able to recover the password from a non-existent email', async () => {


        await expect(
            fakeSendForgotPassword.execut({
                email:"xxxxxx@gmail.com"
            })
        ).rejects.toBeInstanceOf(AppError);

    });

    it('should be able to generate a userToken', async () => {

       const user =  await fakeUserRepository.create({
            email:"kleber2@gmail.com",
            name:'kleber',
            password: '784512'
        });

        await fakeSendForgotPassword.execut({
            email:"kleber2@gmail.com"
        });


        expect(generateToken).toBeCalledWith(user.id);


    });

});
