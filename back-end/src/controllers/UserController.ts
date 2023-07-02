import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
const { v4: uuidv4 } = require('uuid');

import * as bcrypt from "bcryptjs";

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
        const id: any = req.params.idUser;

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
        user.email = email || "";
        user.hashpass = password || "";
        user.role = role || "";

        //check email not null and contain @ char.
        if (!user.email.includes("@")) {
            return res.status(409).json({ status: "failure", message: "Định dạng email không đúng." });
        }

        //check length password >= 6 chars
        if (user.hashpass.length < 6) {
            return res.status(409).json({ status: "failure", message: "Password phải ít nhất 6 kí tự." });
        }

        // check role != admin 
        if (user.role === "admin") {
            return res.status(401).json({ status: "failure", message: "Bạn không thể thiết lập 1 admin mới." });
        }

        user.user_id = uuidv4(); // tạo mã duy nhất
        user.hashPassword();

        //Try to save. If fails, the email is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (err) {
            return res.status(409).json({ status: "failure", message: "Email này đã được sử dụng." });
        }

        //If all ok, send 201 response
        return res.status(201).json({ status: "success", message: "Đã tạo tài khoản thành công." });
    };

    static editUser = async (req: Request, res: Response) => {

        const { user_id, email, role } = req.body;

        if (!user_id) {
            return res.status(401).json({ status: "failure", message: "Thông tin người dùng cần cập nhật không chính xác." });
        }

        //check role != admin
        if (role === "admin") {
            return res.status(401).json({ status: "failure", message: "Không thể tạo ra 1 admin mới." });
        }

        const userRepository = getRepository(User);
        let user: User = {} as User;
        try {
            user = await userRepository.findOneOrFail({
                where: { user_id: user_id },
                select: ["email", "role"]
            });

            console.log("user: ", user)
        } catch (error) {
            return res.status(404).json({ status: "failure", message: "Không tìm thấy người dùng này." });
        }

        //can not update for admin
        if (user.role === "admin") {
            return res.status(404).json({ status: "failure", message: "Không thể chỉnh sửa thông tin người dùng này." });

        }

        let user_update: User = {} as User;

        user_update.email = email;
        user_update.role = role;
        user_update.user_id = user_id;

        // console.log("USER_EDIT: ", user_update);

        //Try to safe, if fails, that means email already in use
        try {
            await userRepository.update(
                { user_id: user_id }, user_update
            );

            return res.status(201).json({ status: "sucess", message: "Đã cập nhật thành công." });
        } catch (error) {
            return res.status(409).json({ status: "failure", message: "Email này đã được sủ dụng rồi." });
        }
        //success

    };

    static deleteUser = async (req: Request, res: Response) => {
        const user_id = req.params.idUser;
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

    static updateProfile = async (req: Request, res: Response) => {
        const newValues: Partial<User> = req.body;
        const updateProductRepository = await getRepository(User);

        newValues.user_id = newValues.user_id || "";

        try {
            await updateProductRepository.findOneOrFail({
                where: { user_id: newValues.user_id }
            });
        } catch (error) {
            return res.status(401).json({ status: "failure", message: "Người dùng không tồn tại." });
        }

        if ("role" in newValues) {
            delete newValues.role;
        }


        if ("email" in newValues) {
            delete newValues.email;
        }

        newValues.hashpass = newValues.hashpass || "";
        if (newValues.hashpass === "") {
            delete newValues.hashpass;
        } else {
            //check length password >= 6 chars
            if (newValues.hashpass.length < 6) {
                return res.status(409).json({ status: "failure", message: "Password phải ít nhất 6 kí tự." });
            }
            newValues.hashpass = await bcrypt.hashSync(newValues.hashpass, 8);
        }


        try {
            await updateProductRepository.update(
                { user_id: newValues.user_id },
                newValues,
            );

            console.log("Newvalue_profile: ", newValues);

            return res.status(200).json({ status: "success", message: "Cập nhật hồ sơ cá nhân thành công." });
        } catch (error) {
            return res.status(401).json({ status: "failure", message: "Cập nhật hồ sơ cá nhân thất bại." });
        }
    }
};

export default UserController;