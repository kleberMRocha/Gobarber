import { Router } from 'express';
import isAuthenticated from '../../../../../shared/infra/http/midwares/isAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import ProvidersAppointmentsControllers from '../controllers/ProvidersAppointmentsControllers';
import {celebrate,Joi,Segments} from 'celebrate';

const providerRoutes = Router();
providerRoutes.use(isAuthenticated);

const providersController = new ProvidersController();
const monthAvailabilityController = new MonthAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();
const providersAppointmentsControllers  = new ProvidersAppointmentsControllers();

providerRoutes.get('/', providersController.index );
providerRoutes.get('/me', providersAppointmentsControllers.index);
providerRoutes.get('/:provider_id/day-availability',
celebrate({[Segments.PARAMS]:{
    provider_id:Joi.string().uuid().required(),
}}),
dayAvailabilityController.index );
providerRoutes.get('/:provider_id/month-availability',
celebrate({[Segments.PARAMS]:{
    provider_id:Joi.string().uuid().required(),
}})
 ,monthAvailabilityController.index );
export default providerRoutes;
