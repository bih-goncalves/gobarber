import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import ScheduleController from './app/controllers/ScheduleController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// routes without session
// new user
routes.post('/users', UserController.store);
// login
routes.post('/sessions', SessionController.store);

// routes with session
routes.use(authMiddleware);
// update user info
routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
//create appointment
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
// store file like avatar
routes.get('/schedule', ScheduleController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
