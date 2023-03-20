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
import { productDetail } from "./detail"

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

export const insertInitialDatabase = async () => {

    //users
    const userRepository = getRepository(User);
    const user1 = new User();
    user1.init("2kfvzy6d4lf7r5sk4", "dev@gmail.com", "", "", "", "", bcrypt.hashSync("123456", 8), "normal_user");
    userRepository.save(user1);

    const user2 = new User();
    user2.init("2kfvzy6d4lf7r5slf", "dev@gmail.com", "", "", "", "", bcrypt.hashSync("123456", 8), "seller");
    userRepository.save(user2);

    const admin = new User();
    admin.init("2kfvzy6qklf7r6k5f", "admin@gmail.com", "", "", "", "", bcrypt.hashSync("123456", 8), "admin");
    userRepository.save(admin);

    //Product
    const productRepository = getRepository(Product);
    const sampleProduct = [...productDetail];
    sampleProduct.forEach(async (item: any, index: number) => {
        item.available = true;
        item.accept = true;
        item.product_id = `product${index}`
        item.owner_id = "2kfvzy6d4lf7r5sk4";

        // console.log("Product_data: ", item);

        try {
            return await productRepository.save(item);
        } catch (error) {
            return;
        }
    })
}