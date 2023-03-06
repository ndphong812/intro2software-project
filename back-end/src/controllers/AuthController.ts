// @ts-ignore
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import uniqid from 'uniqid';
import { User } from "../entities/User";
import config from "../config/config";
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config({ path: './back-end/.env' });

class AuthController {

    static register = async (req: Request, res: Response) => {

        //Check if username and password is not null
        let { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send({
                status: "failed",
                message: "Email or password cannot be null!"
            });
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user: User = new User();
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
            if (user.email) {
                return res.send({
                    status: "failed",
                    message: "Email already registered!"
                });
            }
        } catch (error) {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const token = jwt.sign({
                data: 'Token Data'
            }, 'ourSecretKey', { expiresIn: '10m' }
            );

            const mailConfigurations = {
                from: process.env.EMAIL_ADDRESS,
                to: email,
                subject: 'Email Verification - Localhost Website',
                text: `Hi! There, You have recently visited 
               our website and entered your email.
               Please follow the given link to verify your email
               http://localhost:3000/verify/${token} 
               Thanks`
            };

            transporter.sendMail(mailConfigurations, function (error, info) {
                if (error) {
                    console.log(error);
                }
                console.log('Email Sent Successfully');
            });


            user.user_id = uniqid();
            user.email = email;
            user.hasspass = password;
            user.address = "";
            user.phone = "";
            user.avatar_link = "";
            user.fullname = "";
            user.role = "normal_user";
            user.hashPassword();
            const newUser = await userRepository.save(user);
            const { hasspass, ...result } = newUser;
            return res.send({
                status: "success",
                data: result
            });
        }
    };

    static login = async (req: Request, res: Response) => {
        //Check if username and password is not null
        let { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send({
                status: "failed",
                message: "Email or password cannot be null!"
            });
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user!: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            return res.status(401).send({
                status: "failed",
                message: "Server is errored now"
            });
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return res.status(401).send({
                status: "failed",
                message: "Password is not correct"
            });
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email },
            config.jwtSecret,
            { expiresIn: 60 }
        );

        const { hasspass, ...result } = user;

        //Send the jwt in the response
        res.status(200).send({
            status: "success",
            user: result,
            access_token: token
        });
    };

    // @ts-ignore
    static changePassword = async (req: Request, res: Response) => {
        const id = res.locals.jwtPayload.userId;
        const { oldPassword, newPassword } = req.body;

        //Check old password and new password are not null
        if (!(oldPassword && newPassword)) {
            res.status(400).send();
        }

        //Get user from the database
        const userRepository = getRepository(User);
        // @ts-ignore
        let user: User = {} as User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send();
            return;
        }

        user.hasspass = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the new password and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };
}
export default AuthController;