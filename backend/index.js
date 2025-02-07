import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import cors from "cors"
const app = express();
app.use(bodyParser.json())
app.use(cors())
dotenv.config()

const PORT = process.env.PORT || 7000
const MONGO_URL = process.env.MONGO_URL

mongoose
        .connect(MONGO_URL)
        .then(()=> {
            console.log("DB connected");
            app.listen(PORT,()=> {
                console.log(`Le serveur est en cours sur le port: ${PORT}`);
            })          
        })
        .catch((error)=> console.log(error))

app.use("/api",route)