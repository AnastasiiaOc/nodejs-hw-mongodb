
import express from "express";
import cors from "cors";
import pino from "pino-http";

import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contacts.js"
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

    app.use("/contacts", contactsRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
    
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    // app.get("/contacts", async (req, resp) => {   /////////////////////////////// routers
    //     const data = await getContacts();
    //     resp.json({
    //         status: 200,
    //         message: "Contacts are successfully found",
    //         data,
    //     }); 
    // });
    // app.get("/contacts/:id", async(req, resp) => {
    //     const { id } = req.params;
    //     const data = await getContactsById(id);
    //     if(!data) {
    //         return resp.status(404).json({
    //             status: 404,
    //             message:`The contact with id =${id} is not found`
    //         });
    //     }
    //     resp.json({
    //         status:200,
    //         message:"The movie is successfully found",
    //         data,
    //     });
    // });

   
    // app.use((req, res) =>{
    //     res.status(404).json({
    //         message: 'Not found',
    //     })
    // });

    // app.use((error,req, resp, next) => {
    //     resp.status(500).json({
    //         message: error.message,
    //     });
    // });
    // const port = Number(getEnvVar(PORT));
    
}

// винесіть код роутів з файлу src/server.js до файлу src/routers/contacts.js
// винесіть код контролерів з файлу src/server.js до файлу src/controllers/contacts.js  app.get
// =================================================================

