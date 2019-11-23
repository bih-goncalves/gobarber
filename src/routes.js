import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

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

routes.post('/files', upload.single('file'), (req, res) => res.json({ ok: true }));

export default routes;
