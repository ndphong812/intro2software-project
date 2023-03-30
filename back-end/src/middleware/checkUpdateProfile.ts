import { NextFunction, Request, Response } from "express";
import { getRepository} from "typeorm";
import { User } from "../entities/User";


export const checkUpdate =  async (req: Request, res:Response, next: NextFunction) => {

    // const user_id = req.body.listProOrder[0].customer_id || "";
    const user_id = req.body[0].customer_id || "";

    // console.log("User_id", user_id);

    try {
        const userRepository = getRepository(User);
        let user = await userRepository.findOneOrFail({
            where:({
                user_id : user_id
            })
        });

        // console.log("User_DB", user);


        if(!user.phone || !user.address) {
            return res.status(401).json({ status: "failure", message: "Bạn chưa cập nhật hồ sơ cá nhân."});
        }
        next();

    } catch (error) {
        return res.status(401).json({ status: "failure", message: "Thông tin người dùng sai."});
    }


}