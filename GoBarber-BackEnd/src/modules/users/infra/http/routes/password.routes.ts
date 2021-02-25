import { Router } from 'express';
import ForgotPasswordcontroller from '../Controllers/ForgotPasswordcontroller';
import ResetPasswordController from '../Controllers/ResetPasswordController';
import {celebrate,Joi,Segments} from 'celebrate';

const forgotPasswordcontroller = new ForgotPasswordcontroller();
const resetPasswordController = new ResetPasswordController();

const passwordRouter = Router();

passwordRouter.post('/forgot',celebrate({
    [Segments.BODY]:{
        email: Joi.string().email().required(),

    }
}),forgotPasswordcontroller.create);
passwordRouter.post('/reset',celebrate({
    [Segments.BODY]:{
        token:Joi.string().uuid().required(),
        password:Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))

    }
}), resetPasswordController.create);

export default passwordRouter;
