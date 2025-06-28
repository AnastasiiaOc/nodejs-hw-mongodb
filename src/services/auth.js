// Створимо функцію в сервісі для створення користувача:
// ми застосуємо хешування для зберігання паролю і скористаємось бібліотекою bcrypt. Встановимо її командою:
// npm i bcrypt Та додамо її у сервісну функції registerUser:
// Під час створення моделі User ми вказали, що email користувача має бути унікальним. Тому нам варто перевіряти email на унікальність під час реєстрації та, у разі дублювання, повертати відповідь зі статусом 409 і відповідним повідомленням. Тому додамо таку перевірку у код нашого сервісу для реєстрації:
// Тепер давайте створимо функціонал логіну.
// Загалом, наша аутентифікація буде базуватися на сесії, і ми будемо використовувати пару refresh+access токенів:
// Створимо функцію в сервісі для login:
// Ця функція loginUser виконує процес аутентифікації користувача. Вона приймає об'єкт payload, що містить дані для входу, такі як email та пароль.

// Спочатку функція шукає користувача в базі даних за наданою електронною поштою. Якщо користувача з таким email не знайдено, функція викликає помилку з кодом 404, вказуючи, що користувач не знайдений.
// Якщо користувач знайдений, функція порівнює введений користувачем пароль з хешованим паролем, збереженим у базі даних. Це здійснюється за допомогою бібліотеки bcrypt. Якщо паролі не співпадають, викликається помилка з кодом 401, вказуючи, що користувач неавторизований.
// Далі, функція видаляє попередню сесію користувача, якщо така існує, з колекції сесій. Це робиться для уникнення конфліктів з новою сесією.
// Після цього генеруються нові токени доступу та оновлення. Використовуються випадкові байти, які конвертуються в строку формату base64.
// Нарешті, функція створює нову сесію в базі даних. Нова сесія включає ідентифікатор користувача, згенеровані токени доступу та оновлення, а також часові межі їхньої дії. Токен доступу має обмежений термін дії (наприклад, 15 хвилин), тоді як токен для оновлення діє довше (наприклад, один день).
// Функція refreshUsersSession виконує процес оновлення сесії користувача і взаємодію з базою даних через асинхронні запити. Ось детальне пояснення її роботи:



// Пошук існуючої сесії:

// Функція приймає об'єкт, що містить sessionId і refreshToken.
// Вона шукає в колекції SessionsCollection сесію з відповідним sessionId та refreshToken.
// Якщо сесію не знайдено, функція викликає помилку з кодом 401 (Сесію не знайдено).


// Перевірка терміну дії токена сесії:

// Функція перевіряє, чи не минув термін дії refreshToken. Якщо поточна дата перевищує значення refreshTokenValidUntil, це означає, що токен сесії прострочений.
// Якщо токен сесії прострочений, функція викликає помилку з кодом 401 (Токен сесії прострочений).


// Створення нової сесії:

// Функція викликає createSession, яка генерує нові accessToken і refreshToken, а також встановлює терміни їхньої дії.
// createSession повертає об'єкт з новими токенами і термінами їхньої дії.


// Збереження нової сесії в базі даних:

// Функція створює нову сесію в колекції SessionsCollection, використовуючи ідентифікатор користувача з існуючої сесії та дані нової сесії, згенеровані функцією createSession.
// Нову сесію збережено в базі даних і функція повертає її.


// Таким чином, функція refreshUsersSession обробляє запит на оновлення сесії користувача, перевіряє наявність і термін дії існуючої сесії, генерує нову сесію та зберігає її в базі даних.



import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { User } from "../db/models/User.js";
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { Session } from '../db/models/Session.js';

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

