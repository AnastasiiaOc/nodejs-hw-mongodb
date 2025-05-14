
//src/server.js створіть функцію setupServer, в якій буде створюватись express сервер. Ця функція має в себе включати:
import express from "express";
import cors from "cors";
import pino from "pino-http";

import { getEnvVar } from "./utils/getEnvVar.js";
import { getContacts, getContactsById } from "./services/contacts.js";

// const PORT = getEnvVar("PORT", 3000);
const PORT = Number(getEnvVar('PORT', 3000));
export const setupServer = () => {
    const app = express();

    app.use(cors());
    // app.use(express.json)
    app.use(pino({
        transport: {
            target: "pino-pretty"
        }
    }));
    app.get("/contacts", async (req, resp) => {
        const data = await getContacts();
        resp.json({
            status: 200,
            message: "Contacts are successfully found",
            data,
        }); 
    });
    app.get("/contacts/:id", async(req, resp) => {
        const data = await  getContactsById(id);
        if(!data) {
            return resp.status(404).json({
                status: 404,
                message:`The contact with id =${id} is not found`
            });
        }
        resp.json({
            status:200,
            message:"The movie is successfully found",
            data,
        });
    });

   
    app.use((req, res) =>{
        res.status(404).json({
            message: 'Not found',
        })
    });

    app.use((error,req, resp, next) => {
        resp.status(500).json({
            message: error.message,
        });
    });
    // const port = Number(getEnvVar(PORT));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

// Обробку неіснуючих роутів (повертає статус 404 і відповідне повідомлення)
// 4. Запуск серверу на порті, вказаному через змінну оточення PORT або 3000, якщо такої змінної не зазначено

// 5. При вдалому запуску сервера виводити в консоль рядок “Server is running on port {PORT}”, де {PORT} - це номер вашого порту.

// Не забудьте вказати змінну оточення в файлі .env.example