import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
const { v4: uuidv4 } = require('uuid');

import { User } from "../entities/User";

class UserController {

    static listAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["user_id", "email", "role"] // don't send password in response
        });

        return res.status(200).json({ users });
    };

    static getOneById = async (req: Request, res: Response) => {
        const id: any = req.params.id;

        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail({
                where: { user_id: id },
                select: ['user_id', 'email', 'role']
            });

            return res.status(200).json({ status: "success", user: user });

        } catch (error) {
            return res.status(401).json({ status: "failure", message: "Người dùng không tồn tại." });
        }
    };

    static newUser = async (req: Request, res: Response) => {
        const { email, password, role } = req.body;
        let user = new User();
        user.email = email;
        user.hashpass = password;
        user.role = role;

        //check length password >= 6 chars
        if (password.length < 6) {
            return res.status(409).send("Password phải ít nhất 6 kí tự.");
        }

        // check role != admin 
        if (user.role === "admin") {
            return res.status(401).send("Bạn không thể thiết lập 1 admin mới.");
        }

        user.user_id = uuidv4(); // tạo mã duy nhất
        user.hashPassword();

        //Try to save. If fails, the email is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (err) {
            return res.status(409).send("Email này đã được sử dụng.");
        }

        //If all ok, send 201 response
        return res.status(201).send("Đã tạo tài khoản thành công.");
    };

    static editUser = async (req: Request, res: Response) => {

        const { user_id, email, role } = req.body;

        //check role != admin
        if (role === "admin") {
            return res.status(401).json({ status: "failure", message: "Không thể tạo ra 1 admin mới." });
        }

        const userRepository = getRepository(User);
        let user: User = {} as User;
        try {
            user = await userRepository.findOneOrFail({
                where: { user_id: user_id }
            });
        } catch (error) {
            return res.status(404).json({ status: "failure", message: "Không tìm thấy người dùng này." });
        }

        //can not update for admin
        if (user.role === "admin") {
            return res.status(404).json({ status: "failure", message: "Không thể chỉnh sửa thông tin người dùng này." });

        }

        user.email = email;
        user.role = role;

        // console.log("USER_EDIT: ", user);

        //Try to safe, if fails, that means email already in use
        try {
            console.log("before-update")
            await userRepository.update(
                { user_id: user.user_id }, user
            );

            return res.status(201).json({ status: "sucess", message: "Đã cập nhật thành công." });
        } catch (error) {
            return res.status(409).json({ status: "failure", message: "Email này đã được sủ dụng rồi." });
        }
        //success

    };

    static deleteUser = async (req: Request, res: Response) => {
        const user_id = req.params.id;
        const userRepository = getRepository(User);
        let user: User = {} as User;
        try {
            user = await userRepository.findOneOrFail({
                where: { user_id: user_id }
            });

            //check user!= admin
            if (user.role === "admin") {
                return res.status(401).json({ status: "failure", message: "Không thể xóa người dùng này." });
            }

            userRepository.delete(user_id as any);

            return res.status(200).json({ status: "success", message: "Xóa người dùng thành công." })

        } catch (error) {
            return res.status(404).json({ status: "failure", message: "Người dùng này không tồn tại." });
        }
    };
};

export default UserController;