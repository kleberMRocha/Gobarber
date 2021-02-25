import {Router} from 'express';
import appointmentsRouter from '../../../../modules/appointments/infra/http/Routes/appointment.routes';
import providersRoutes from '../../../../modules/appointments/infra/http/Routes/providers.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/user';
import sessionRoute from '../../../../modules/users/infra/http/routes/session';
import passWorRoute from '../../../../modules/users/infra/http/routes/password.routes';
import profile from '../../../../modules/users/infra/http/routes/profile.routes';

const route = Router();

route.use('/providers', providersRoutes);
route.use('/profile', profile);
route.use('/password', passWorRoute);
route.use('/appointments',appointmentsRouter);
route.use('/users',usersRouter);
route.use('/session',sessionRoute);


export default route;
