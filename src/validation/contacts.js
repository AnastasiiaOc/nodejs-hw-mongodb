import Joi from "joi";

export const contactScheme = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber:Joi.string().min(3).max(20).required(),
     email: Joi.string().email().min(3).max(20).required(),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid("work", "home", "personal").required().default("personal"),   
});

export const updateContactScheme = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber:Joi.string().min(3).max(20),
     email: Joi.string().email().min(3).max(20),
    isFavourite: Joi.boolean().default(false),
    contactType: Joi.string().valid("work", "home", "personal").default("personal"),   

});
