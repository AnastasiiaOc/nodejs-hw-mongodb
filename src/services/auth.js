// src/services/auth.js
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { User } from "../db/models/User.js";
import { FIFTEEN_MINUTES, ONE_DAY, TEMPLATES_DIR} from '../constants/index.js';
import { Session } from '../db/models/Session.js';

import jwt from 'jsonwebtoken';
import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendMail.js';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

 export const registerUser = async (payload) => {
  
  const user = await User.findOne({ email: payload.email });
   if (user) throw createHttpError(409, 'Email in use');
   
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};


export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(401, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};


export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};


const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }


  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  const newSession = createSession();
  await Session.deleteOne({ _id: sessionId, refreshToken });
  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

// Тепер ми готові створити сервіс для надсилання повідомлень
export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWT_SECRET'), //JWT SECRET CAN BE ANY
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    // https://<your-frontend-domain>/reset-password?token=<jwt-token>
  });
  await sendEmail({
    from: getEnvVar(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
  } catch (err) {
    // if (err instanceof Error) throw createHttpError(401, err.message);
    if (err instanceof Error) throw createHttpError(401, "JWT token expired or corrupted");
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await User.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
// Тут також додається одна змінна оточення - JWT_SECRET, яка буде використовуватися для генерації підпису нашого токену. Значення у неї може бути довільним, Функція requestResetToken спочатку шукає користувача в колекції користувачів за вказаною електронною поштою. Якщо користувача не знайдено, викликається помилка з кодом 404 і повідомленням "User not found".
// Якщо користувача знайдено, функція створює токен скидання пароля, який містить ідентифікатор користувача та його електронну пошту. Токен підписується секретом JWT і має термін дії 15 хвилин.
// Після цього функція надсилає електронний лист користувачу, який містить посилання для скидання пароля з включеним створеним токеном.

// За допомогою літералу {{}} в html коді ми вказуємо, які значення мають бути там відмальовані. Для того, щоб отримати шаблон, нам треба прочитати його контент із файла, передати в функцію handlebars.compile(). Після цього ми можемо передати в результат виконання цієї функції значення, що ми хочемо використати в шаблоні, і на виході отримаємо html, що може бути використаний для відправлення у листі.
