// @ts-ignore
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import uniqid from 'uniqid';
import { User } from "../entities/User";
import config from "../config/config";
import nodemailer from "nodemailer";
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
            // let testAccount = await nodemailer.createTestAccount();
            // let transporter = nodemailer.createTransport({
            //     host: "smtp.ethereal.email",
            //     port: 587,
            //     secure: false, // true for 465, false for other ports
            //     auth: {
            //         user: testAccount.user, // generated ethereal user
            //         pass: testAccount.pass, // generated ethereal password
            //     },
            // });
            // let info = await transporter.sendMail({
            //     from: '"Nguyễn Đình Phong" <ndphong812@gmail.com>', // sender address
            //     to: `${email}, ${email}`, // list of receivers
            //     subject: "Verity your account", // Subject line
            //     text: `Hello, I'm verifying system, this is your email verifying your account. Please type this code in your register. Your code is: ${Math.floor(Math.random() * 10000)}`,
            //     html: "<b>Hello world?</b>", // html body
            // });
            // console.log("Message sent: %s", info.messageId);
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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
            { userId: user.user_id, username: user.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        const { hasspass, ...result } = user;

        //Send the jwt in the response
        res.status(200).send({
            status: "success",
            data: result,
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