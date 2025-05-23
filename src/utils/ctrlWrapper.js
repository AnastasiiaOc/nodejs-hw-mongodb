// Створіть у файлі src/utils/ctrlWrapper.js і застосуйте у файлі src/routers/contacts.js функцію ctrlWrapper, яка діятиме як обгортка для контролерів у вашому Express-додатку, для автоматичної обробки помилок, що можуть виникнути під час виконання запитів. В цій обгортці при виникненні помилки викличте next(err) для залучення middleware errorHandler



// Для роута GET /contacts/:contactId якщо контакт не було знайдено, то за допомогою http-errors створіть помилку зі статусом 404 і повідомленням "Contact not found".



// http-errors(404, "Contact not found")

export const ctrlWrapper = (controller) => {
    const func = async (req, resp, next) => {
        try {
            await controller(req, resp, next);
        }
        catch (error) {
            next(error)
        }
    }
    return ctrlWrapper;
};
