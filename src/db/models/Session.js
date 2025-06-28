// Створіть модель Session з такими полями:

// userId - string, required
// accessToken - string, required
// refreshToken - string, required
// accessTokenValidUntil - Date, required
// refreshTokenValidUntil - Date, required

import { model, Schema } from 'mongoose';


const sessionScheme = new Schema(
  {
    userId: {  type: Schema.Types.ObjectId, ref: 'User', required: true }, // ref ' user' , ' User' or 'users' check)
    accessToken: { type: String, required: true},
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: {type:Date, required: true },
    refreshTokenValidUntil:{type: Date, required: true},
    
  },
  { timestamps: true, versionKey: false },
);

export const Session = model('sessions', sessionScheme);

    // Наша сесія буде складатися з:

    // Access токену - короткоживучий(в нашому випадку 15 хвилин) токен, який браузер буде нам додавати в хедери запитів (хедер Authorization)
    // Терміну життя access токену
    // Refresh токену - більш довгоживучому (в нашому випадку 1 день, але може бути і більше) токену, який можна буде обміняти на окремому ендпоінті на нову пару access + resfresh токенів. Зберігається в cookies(поговоримо про них детальніше трохи далі)
    // Терміну життя refresh токену
    // Id юзера, якому належить сесія.