import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

// routes without session
// new user
routes.post("/users", UserController.store);
// login
routes.post("/sessions", SessionController.store);

// routes with session
routes.use(authMiddleware);
// update user info
routes.put("/users", UserController.update);

export default routes;
