//server.js
import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from 'cookie-parser';

import { getEnvVar } from "./utils/getEnvVar.js";
// import contactsRouter from "./routers/contacts.js"
import router from "./routers/index.js"
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json())
    app.use(cookieParser());
    app.use(pino({
        transport: {
            target: "pino-pretty"
        }
    }));

    // app.use("/contacts", contactsRouter);
    app.use(router);
    app.use(notFoundHandler);
    app.use(errorHandler);
    
    app.use('/uploads', express.static(UPLOAD_DIR));
    
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}




