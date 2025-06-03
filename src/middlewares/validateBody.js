// Створіть функцію validateBody, яка буде приймати аргументом схему валідації, а повертати буде middleware для валідації body запиту.
// Додайте валідацію до роутів POST /contacts та PATCH /contacts/:contactId. Побудуйте схеми валідації, базуючись на тому, як ви описали властивості моделі MongoDB. Окрім цього, для полів типу string додайте правила мінімальної довжини - 3 символи, та максимальної довжини - 20 символів.
import createHttpError from "http-errors"
export const validateBody = (validationScheme) => {
    return async (req, response, next) => {
        try { 
            await validationScheme.validateAsync(req.body, {
                abortEarly: false,
            });
            next();
            }
        catch (error) {
            const errors = error.details.map((detail) => detail.message);
            next(createHttpError.BadRequest(errors));
            }  
    }       
}