import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const checkSeller = async (req: Request, res: Response, next: NextFunction) => {

    const user_id = req.body.user_id || "";
    const owner_id = req.body.owner_id || ",";

    // console.log("user_id: ", user_id);
    // console.log("owner_id: ", owner_id);

    //check user_id and owenr_id is one person
    if(user_id !== owner_id) {
        return res.status(401).json({ status: "failure", message: "Bạn không thể thực hiện hành động này." });
    }


    const userRepository = getRepository(User);
    let user: User = {} as User;
    try {
        user = await userRepository.findOneOrFail({
            where: { user_id: user_id },
            select: ['role']
        });

        console.log("Role: ", user.role);
        // you are seller
        if (user.role === "seller") {
            return next();
        }
        return res.status(401).json({ status: "failure", message: "Bạn không phải người bán hàng, không thể thực hiện hành động này." });
    } catch (error) {
        return res.status(401).json({ status: "failure", message: "Bạn không phải người bán hàng, không thể thực hiện hành động này." });
    }
};