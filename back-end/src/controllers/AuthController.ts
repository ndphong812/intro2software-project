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

interface JwtPayload {
    email: string,
    password: string
}

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

class AuthController {

    static verifyEMail = async (req: Request, res: Response) => {
        const { token } = req.params;
        try {
            const decoded = jwt.verify(token, config.ourSecretKey) as JwtPayload;
            let user: User = new User();
            user.user_id = uniqid();
            user.email = decoded.email;
            user.hashpass = decoded.password;
            user.address = "";
            user.phone = "";
            user.avatar_link = "";
            user.fullname = "";
            user.role = "normal_user";
            user.hashPassword();

            const userRepository = getRepository(User);
            const newUser = await userRepository.save(user);
            const { hashpass, user_id, ...result } = newUser;
            return res.send({
                status: "success",
                message: "Email verifified successfully",
                data: result
            });
        } catch (err) {
            return res.status(401).send({
                status: "failed",
                message: "Email verification failed, possibly the link is invalid or expired"
            });
        }
    }

    static verifyLoginToken = async (req: Request, res: Response) => {
        const { token } = req.body;
        try {
            const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

            let user: User = new User();
            const userRepository = getRepository(User);

            user = await userRepository.findOneOrFail({ where: { email: decoded.email } });
            const { hashpass, user_id, ...result } = user;

            return res.status(200).send({
                status: "success",
                user: result,
                message: "Verify successfully"
            });
        } catch (error) {
            return res.status(401).send({
                status: "failed",
                message: "Email verification failed, possibly the link is invalid or expired"
            });
        }
    }

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
        try {
            let user: User = new User();
            user = await userRepository.findOneOrFail({ where: { email } });
            if (user.email) {
                return res.status(400).send({
                    status: "failed",
                    message: "Email already registered!"
                });
            }
        } catch (error) {

            const token = jwt.sign(
                { email, password },
                config.ourSecretKey,
                { expiresIn: "10m" }
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
                    return res.status(400).send({
                        status: "failed",
                        message: "Server is error now."
                    });
                }
                else {
                    return res.status(200).send({
                        status: "success",
                        message: "Check verify code in your email."
                    });
                }
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
                message: "Email is not correct"
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
            { email: user.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.status(200).send({
            status: "success",
            access_token: token
        });
    };


    static fotgotPassword = async (req: Request, res: Response) => {
        let { email } = req.body;

        if (!(email)) {
            return res.status(400).send({
                status: "failed",
                message: "Email cannot be null!"
            });
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user!: User;
        try {
            user = await userRepository.findOneOrFail({ where: { email } });
        } catch (error) {
            return res.status(400).send({
                status: "failed",
                message: "Email is not correct"
            });
        }

        const newPassword = uniqid();
        user.hashpass = newPassword;
        user.hashPassword();
        userRepository.save(user);
        const mailConfigurations = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Provide new password',
            text: `Hi, your new password is: ${newPassword}`
        };

        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) {
                return res.status(400).send({
                    status: "failed",
                    message: "Server is error now."
                });
            }
            else {
                return res.status(200).send({
                    status: "success",
                    message: "Check new password in your email."
                });
            }
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

        user.hashpass = newPassword;
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