
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