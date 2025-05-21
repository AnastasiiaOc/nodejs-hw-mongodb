// src/db/initMongoConnection.js.

import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async() =>{
    try{

const user = getEnvVar("MONGODB_USER");
const password = getEnvVar("MONGODB_PASSWORD");
const url = getEnvVar("MONGODB_URL");
const db = getEnvVar("MONGODB_DB");

// console.log({ user, password, url, db }); 
// console.log(`Connecting to: mongodb+srv://${user}:[hidden]@${url}/${db}`); 
 

await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
console.log("Mongo connection successfully established!");

    }
    catch(error){
        console.log(error.message);
        throw error;
    }
}

// Створіть свій кластер в mongodb та функцію initMongoConnection для встановлення зʼєднання з нею в окремому файлі src/db/initMongoConnection.js.



