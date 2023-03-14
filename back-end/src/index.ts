import "reflect-metadata";
import { createConnection, DatabaseType } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes/index";
import { User } from "./entities/User";
import { Cart } from "./entities/Cart";
import { Comment } from "./entities/Comment";
import { Notification } from "./entities/Notification";
import { Ordered } from "./entities/Ordered";
import { Product } from "./entities/Product";
import { Chat } from "./entities/Chat";
import dotenv from 'dotenv'
import { insertInitialDatabase } from "./config/db";

dotenv.config({ path: './.env' });

createConnection({
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": Number(process.env.DB_PORT),
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [
        User, Cart, Comment, Notification, Ordered, Product, Chat
    ],
    "synchronize": true
})
    .then(async connection => {
        const app = express();
        const insertDB = insertInitialDatabase();
        // Call midlewares
        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use("/", routes);
        app.get('/', (req, res) => {
            res.send('hello from server!')
        })
        app.get('/cart', (req, res) => {
            res.send('hello from server cart!')
        })
        app.listen(5000, () => {
            console.log("Server started on port 5000!");
        });
    })
    .catch(error => console.log(error));