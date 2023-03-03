import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index";
import { User } from "./entities/User";
import dotenv from 'dotenv'
dotenv.config()

//Connects to the Database -> then starts the express
const app = express();
console.log("Before connecting...")


createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "08122002",
    "database": "test",
    "entities": [
        User
    ],
    "synchronize": true
})
    .then(async connection => {
        // Create a new express application instance
        const app = express();

        // Call midlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        //Set all routes from routes folder
        app.use("/", routes);
        app.get('/', (req, res) => {
            res.send('hello from server!')
        })
        app.listen(5000, () => {
            console.log("Server started on port 5000!");
        });
    })
    .catch(error => console.log(error));