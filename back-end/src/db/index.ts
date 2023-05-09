import { DataSource, getRepository } from "typeorm"
import { Cart } from "../entities/Cart"
import { Chat } from "../entities/Chat"
import { Ordered } from "../entities/Ordered"
import { Product } from "../entities/Product"
import { User } from "../entities/User"
import { Notification } from "../entities/Notification"
import { Comment } from "../entities/Comment"
import dotenv from 'dotenv'
import * as bcrypt from "bcryptjs";
import uniqid from "uniqid"

dotenv.config({ path: './back-end/.env' });

export const myDataSource = new DataSource({
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