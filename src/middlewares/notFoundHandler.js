// Створіть у файлі src/middlewares/notFoundHandler.js і застосуйте у файлі src/server.js middleware notFoundHandler, призначений для обробки запитів, коли клієнт звертається до неіснуючого маршруту. notFoundHandler у разі виявлення помилки має за допомогою http-errors створити помилку зі статусом 404 і повідомленням "Route not found".

export const notFoundHandler = (req, resp) => {

    resp.status(404).json({
        status: 404,
        message: "Route not found"
    })
    
}
