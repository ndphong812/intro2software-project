import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";

import { User } from "../entities/User";
import config from "../config/config";
import { JwtPayload } from "../controllers/type";

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previous midleware
        const user_id = res.locals.jwtPayload.user_id; // need to test again ?

        //Get user role from the database
        const userRepository = getRepository(User);
        let user: User = {} as User;
        try {
            user = await userRepository.findOneOrFail({
                where: {user_id: user_id},
                select: ['role']
            });

            if(user.role === "admin") {
                next();
            }
        } catch (error) {
            return res.status(401).json({status: "failure", message: "Bạn không phải admin, không thể truy cập."});
        }

    };

};
