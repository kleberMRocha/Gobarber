import { Router } from 'express';
import isAuthenticated from '../../../../../shared/infra/http/midwares/isAuthenticated';
import AppointmentsController from '../controllers/AppointmentController';
import {celebrate, Segments, Joi} from 'celebrate';

const appointmentsRouter = Router();
appointmentsRouter.use(isAuthenticated);
const appointmentsController = new AppointmentsController();


appointmentsRouter.post('/',celebrate({
    [Segments.BODY]:{

        provider_id: Joi.string().uuid().required(),
        date: Joi.date()

    }

}), appointmentsController.create);

appointmentsRouter.get('/', async (request, response)=>{
        // const appointmentsRepository = new AppointmentsRepository();
        // const allApointments = await appointmentsRepository.find();
        // if(allApointments.length != 0){
        //     return response.status(200).json({allApointments});
        // }

        // return  response.status(300).json({message:'no appointments found'});

});


export default appointmentsRouter;
