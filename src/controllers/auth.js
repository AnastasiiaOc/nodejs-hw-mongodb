// Браузер буде намагатися додавати cookies під час запиту до певного домену, де вони були видані(cookies є домен-специфічними). Проте при використанні різних http-клієнтів, можуть знадобитися додаткові налаштуваня (наприклад, використання withCredentials: true у налаштуваннях axios або credentials: 'include' у fetch)
// До деяких cookies можливий доступ із js браузера, щоб запобігти цьому(оскільки ми користуємося цими cookies для аутентифікації), ми скористаємося прапором httpOnly: true, що забороняє доступ до них через клієнтський JS. Таким чином ми можемо запобігти їх викраденню за допомогою скриптів.
// Ця функція loginUserController виконує процес обробки запиту на вхід користувача і взаємодію з клієнтом через HTTP. Ось детальне пояснення її роботи:
// Виклик функції аутентифікації:
// Функція приймає об'єкти запиту (req) і відповіді (res).
// Вона викликає функцію loginUser, передаючи їй тіло запиту (req.body), яке містить дані для входу (email та пароль).
// loginUser виконує процес аутентифікації і повертає об'єкт сесії.


// Встановлення куків:
// Функція встановлює два куки: refreshToken і sessionId, використовуючи метод res.cookie.
// refreshToken зберігається як http-only cookie, що означає, що він доступний тільки через HTTP-запити і не може бути доступним через JavaScript на стороні клієнта. Він має термін дії один день.
// sessionId також зберігається як http-only cookie з аналогічним терміном дії.


// Відправлення відповіді клієнту:
// Функція формує JSON-відповідь, яка включає статусний код 200, повідомлення про успішний вхід користувача та дані, що містять accessToken.
// Використовується метод res.json для відправлення відповіді клієнту.
// Таким чином, функція loginUserController обробляє HTTP-запит на вхід користувача, викликає функцію аутентифікації loginUser, встановлює куки для збереження токенів та ідентифікатора сесії, і відправляє клієнту відповідь з інформацією про успішний вхід та токеном доступу.

import { registerUser } from "../services/auth.js";
import { loginUser } from '../services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { logoutUser } from "../services/auth.js";
import { refreshUsersSession } from "../services/auth.js";

export const registerContactController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};


export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Ця функція logoutUserController виконує процес обробки запиту на вихід користувача і взаємодію з клієнтом через HTTP. Ось детальне пояснення її роботи:
// Перевірка наявності sessionId:
// Функція приймає об'єкти запиту (req) і відповіді (res).
// Вона перевіряє, чи існує кукі sessionId у запиті. Якщо sessionId присутній, функція викликає logoutUser, передаючи їй значення sessionId. Це дозволяє видалити сесію користувача з бази даних або здійснити інші необхідні дії для виходу користувача.
// Очищення куків:
// Функція очищає кукі sessionId і refreshToken, використовуючи метод res.clearCookie. Це видаляє відповідні куки з браузера клієнта, що забезпечує вихід користувача з системи на стороні клієнта.
// Відправлення відповіді:
// Функція відправляє відповідь клієнту зі статусним кодом 204 (No Content). Це означає, що запит був успішно оброблений, але у відповіді немає тіла повідомлення.
// Таким чином, функція logoutUserController обробляє HTTP-запит на вихід користувача, викликає функцію для видалення сесії logoutUser, очищає відповідні куки та відправляє клієнту відповідь про успішний вихід з системи.
// Створимо окремий роутер для logout
// Функція refreshUserSessionController виконує процес оновлення сесії користувача і взаємодію з клієнтом через HTTP. Ось детальне пояснення її роботи:
// Виклик функції оновлення сесії:
// Функція приймає об'єкти запиту (req) і відповіді (res).
// Вона викликає функцію refreshUsersSession, передаючи їй об'єкт з sessionId та refreshToken, отримані з куків запиту (req.cookies.sessionId та req.cookies.refreshToken).
// refreshUsersSession виконує процес оновлення сесії і повертає об'єкт нової сесії.


// Встановлення нових куків:

// Функція викликає setupSession, передаючи їй об'єкт відповіді (res) та нову сесію.
// setupSession встановлює два куки: refreshToken і sessionId, використовуючи метод res.cookie.
// refreshToken зберігається як http-only cookie, що означає, що він доступний тільки через HTTP-запити і не може бути доступним через JavaScript на стороні клієнта. Він має термін дії один день.
// sessionId також зберігається як http-only cookie з аналогічним терміном дії.


// Відправлення відповіді клієнту:

// Функція формує JSON-відповідь, яка включає статусний код 200, повідомлення про успішне оновлення сесії та дані, що містять accessToken.
// Використовується метод res.json для відправлення відповіді клієнту.


// Таким чином, функція refreshUserSessionController обробляє HTTP-запит на оновлення сесії користувача, викликає функцію для оновлення сесії refreshUsersSession, встановлює нові куки для збереження токенів та ідентифікатора сесії, і відправляє клієнту відповідь з інформацією про успішне оновлення сесії та новим токеном доступу.



