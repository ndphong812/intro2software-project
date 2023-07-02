import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get id of admin
  const idAdmin = req.params.idAdmin || req.body.idAdmin || "";
  const emailAdmin = req.params.emailAdmin || req.body.emailAdmin || "";

  // console.log("idAdmin: ", idAdmin)
  // console.log("emailAdmin: ", emailAdmin)

  // if url have not info
  if (!idAdmin || !emailAdmin) {
    return res
      .status(401)
      .json({
        status: "failure",
        message: "Bạn không phải người quản trị, không thể truy cập.",
      });
  }

  //Get user role from the database
  const userRepository = getRepository(User);
  let user: User = {} as User;
  try {
    user = await userRepository.findOneOrFail({
      where: { user_id: idAdmin, email: emailAdmin },
      select: ["role"],
    });

    console.log("Role: ", user.role);
    // you are admin
    if (user.role === "admin") {
      return next();
    }

    return res
      .status(401)
      .json({
        status: "failure",
        message: "Bạn không phải người quản trị, không thể truy cập.",
      });
  } catch (error) {
    return res
      .status(401)
      .json({
        status: "failure",
        message: "Bạn không phải người quản trị, không thể truy cập.",
      });
  }
};
