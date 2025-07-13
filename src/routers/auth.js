// Створимо окремий роутер для авторизації:

import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerContactSchema, loginUserSchema  } from '../validation/auth.js'
import { validateBody } from '../middlewares/validateBody.js';

import { logoutUserController } from "../controllers/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";
import { registerContactController } from '../controllers/auth.js';
import { loginUserController } from "../controllers/auth.js";

import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';


import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';

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

//creating route to drop the password

// authRouter.post(
//   '/request-reset-email',
//   validateBody(requestResetEmailSchema),
//   ctrlWrapper(requestResetEmailController),
// );

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);


export default authRouter;


authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

