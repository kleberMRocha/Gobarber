import { Router } from 'express';
import SessionsControler from '../Controllers/SessionsControler';
import { Segments, celebrate, Joi } from 'celebrate';


const sessionsControler = new SessionsControler();
const sessionRoute = Router();

sessionRoute.post('/', celebrate({
    [Segments.BODY]:{
        email:Joi.string().email().required(),
        password:Joi.string().required()
    }

}),sessionsControler.create);
export default sessionRoute;
