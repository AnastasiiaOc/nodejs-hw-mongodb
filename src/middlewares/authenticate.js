import createHttpError from 'http-errors';

import { Session } from '../db/models/Session.js';
import { User } from '../db/models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401));
    return;
  }

  req.user = user;

  next();
};

// Middleware authenticate виконує процес аутентифікації користувача, перевіряючи наявність та дійсність токена доступу в заголовку запиту. Ось детальне пояснення її роботи:



// Перевірка заголовка авторизації:

// Функція приймає об'єкти запиту (req), відповіді (res) і наступної функції (next).
// Вона отримує заголовок авторизації за допомогою req.get('Authorization').
// Якщо заголовок авторизації не надано, функція викликає помилку з кодом 401 (Будь ласка, надайте заголовок авторизації) і передає її до наступної функції за допомогою next.


// Перевірка типу заголовка та наявності токена:

// Функція розділяє заголовок авторизації на дві частини: тип (повинен бути "Bearer") і сам токен.
// Якщо тип заголовка не "Bearer" або токен відсутній, функція викликає помилку з кодом 401 (Заголовок авторизації повинен бути типу Bearer) і передає її до наступної функції.


// Перевірка наявності сесії:

// Функція шукає сесію в колекції SessionsCollection за наданим токеном доступу.
// Якщо сесію не знайдено, функція викликає помилку з кодом 401 (Сесію не знайдено) і передає її до наступної функції.


// Перевірка терміну дії токена доступу:

// Функція перевіряє, чи не минув термін дії токена доступу, порівнюючи поточну дату з датою закінчення дії токена.
// Якщо токен прострочений, функція викликає помилку з кодом 401 (Токен доступу прострочений) і передає її до наступної функції.


// Пошук користувача:

// Функція шукає користувача в колекції UsersCollection за ідентифікатором користувача, який зберігається в сесії.
// Якщо користувача не знайдено, функція викликає помилку з кодом 401 і передає її до наступної функції.


// Додавання користувача до запиту:

// Якщо всі перевірки успішні, функція додає об'єкт користувача до запиту (req.user = user).
// Викликається наступна функція за допомогою next, що дозволяє продовжити обробку запиту.


// Таким чином, функція authenticate обробляє запит на аутентифікацію, перевіряє наявність і дійсність заголовка авторизації та токена доступу, шукає відповідну сесію та користувача, а також додає об'єкт користувача до запиту, якщо всі перевірки успішні.



// Тепер ми можемо скористатись нашим middleware authenticate в роутері для запитів до колекції студентів:// src/routers/students.js

