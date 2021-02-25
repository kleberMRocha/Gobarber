import { Router } from 'express';
import isAuthenticated  from '../../../../../shared/infra/http/midwares/isAuthenticated';
import multer from 'multer';
import storage from '../../../../../config/upload';

import UserControllers from '../Controllers/UsersControllers';
import UserAvatarController from '../Controllers/UserAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';


const usersRouter = Router();
const upload = multer(storage.config.disk);

const userControllers = new UserControllers();
const userAvatarController = new UserAvatarController();


usersRouter.post('/',

celebrate({
    [Segments.BODY]:{
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }

})
 ,userControllers.create);


usersRouter.patch('/avatar',
    upload.single('avatar'),
    userAvatarController.update
);

export default usersRouter;
