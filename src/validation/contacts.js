import Joi from "joi";
import { isValidObjectId } from 'mongoose';

// Створимо можливість при створенні студента вказувати звʼязок між колекціями users та User. Для цього додамо до існуючих схем createStudentSchema та studentsSchema властивість userId

export const contactScheme = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber:Joi.string().min(3).max(20).required(),
     email: Joi.string().email().min(3).max(20).required(),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid("work", "home", "personal").required().default("personal"),   
    userId: Joi.string().custom((value, helper) => {
        if (value && !isValidObjectId(value)) {
          return helper.message('User id should be a valid mongo id');
        }
        return true;
      }),
});

export const updateContactScheme = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber:Joi.string().min(3).max(20),
     email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid("work", "home", "personal").default("personal"),   

});
