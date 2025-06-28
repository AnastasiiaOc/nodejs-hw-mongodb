// До деяких cookies можливий доступ із js браузера, щоб запобігти цьому(оскільки ми користуємося цими cookies для аутентифікації), ми скористаємося прапором httpOnly: true, що забороняє доступ до них через клієнтський JS. Таким чином ми можемо запобігти їх викраденню за допомогою скриптів
// Для роботи із куками нам також треба буде встановити пакет cookie-parser


import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from 'cookie-parser';

import { getEnvVar } from "./utils/getEnvVar.js";
// import contactsRouter from "./routers/contacts.js"
import router from "./routers/index.js"
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json())
    app.use(pino({
        transport: {
            target: "pino-pretty"
        }
    }));

    // app.use("/contacts", contactsRouter);
    app.use(router);
    app.use(notFoundHandler);
    app.use(errorHandler);
    
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}


export const startServer = () => {
    const app = express();
  
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
};

