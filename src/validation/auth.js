import Joi from 'joi';

export const registerContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
// password - обов’язково (памʼятайте, що пароль має бути захешованим за допомогою бібліотеки bcrypt)


export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});