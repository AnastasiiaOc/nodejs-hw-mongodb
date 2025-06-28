// Створіть модель User з такими полями:

// name - string, required
// email - string, email, unique, required
// password - string, required
// createdAt - дата створення
// updatedAt - дата оновлення
// Перш за все, ми маємо виправити відповідь на роуті POST /auth/register, в якій окрім всього ми повертаємо пароль. Це не є безпечним. Проте це можна виправити за допомогою переписуванням методу toJSON() у схемі юзера:
// Метод toJSON() викликається тоді, коли обʼєкт серіалізується (перетворюється на JSON) під час виклику JSON.stringify() або res.json().
import { model, Schema } from 'mongoose';

const userScheme = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    // createdAt: { Date, required: true },
    // updatedAt:{ Date, required: true},
    
  },
  { timestamps: true, versionKey: false },

);

userScheme.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('users', userScheme);
