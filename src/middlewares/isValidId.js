// Додайте middleware isValidId для перевірки валідності id і застосуйте його в усіх роутах, які працюють з id.

import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export function isValidId(req, response, next) {
    if (isValidObjectId(req.params.id) !== true) {
        return (next(createHttpError.BadRequest("ID is not valid")))
    }
    next();
}