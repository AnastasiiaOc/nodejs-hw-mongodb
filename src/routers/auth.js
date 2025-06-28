// Створимо окремий роутер для авторизації:

import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerContactSchema, loginUserSchema  } from '../validation/auth.js'
import { validateBody } from '../middlewares/validateBody.js';

import { logoutUserController } from "../controllers/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";
import { registerContactController } from '../controllers/auth.js';
import { loginUserController } from "../controllers/auth.js";


const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerContactSchema),
  ctrlWrapper(registerContactController),
);


authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));




export default authRouter;


// •	password - обов’язково (памʼятайте, що пароль має бути захешованим за допомогою бібліотеки bcrypt)

