import userController from "../controllers/user.controller.js";
import { Router } from "express";
import { handle_auth } from "../middlewares/auth.js";

const user_router = Router();

user_router.route('/').get(userController.get_user_by_email_username);
user_router.route('/:id_user').get(userController.get_user_by_id);
user_router.route('/auth').post(handle_auth, userController.auth);
user_router.route('/auth/login').post(userController.login);
user_router.route('/auth/register').post(userController.register);


export default user_router;
