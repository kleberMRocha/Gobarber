import { Segments, celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import isAuthenticated  from '../../../../../shared/infra/http/midwares/isAuthenticated';

import ProfileController from '../Controllers/ProfileController';


const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(isAuthenticated);


profileRouter.put('/',

celebrate({[Segments.BODY]:{
    name:Joi.string(),
    email:Joi.string().email(),
    NewPassword:Joi.string(),
    password:Joi.string(),
    passwordConfirmation: Joi.string().valid(Joi.ref('password'))

}})

,profileController.update);

profileRouter.get('/',profileController.show);

export default profileRouter;
