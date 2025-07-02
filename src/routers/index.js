// src/routers/index.js


// Оскільки у нас тепер є 2 окремі роути, для взаємодією з колекцією студентів і колекцією користувачів, краще винести їх підключення в окремий файл src/routers/index.js:
// Після винесення шляху "/contacts" до окремого роуту, відповідні зміни потрібно внести і у файл src/routers/contacts.js


import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;


