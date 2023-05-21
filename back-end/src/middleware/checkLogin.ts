import { NextFunction, Request, Response } from "express";
import { getRepository} from "typeorm";
import { User } from "../entities/User";
// import dotenv from 'dotenv'

import jwt from "jsonwebtoken";
const config = require("../config/config");
// dotenv.config({ path: './back-end/.env' });

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
    console.log("checklogin")


  // Lấy token từ header hoặc query string hoặc các phương thức khác
//   const token = req.header("Authorization")?.replace("Bearer ", "");
  // const token = req.header("Authorization");
  const {token} = req.body;
  // const tokentest = req.headers;

  console.log("token: ", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Xác thực và giải mã token
    const decoded = jwt.verify(token, config.ourSecretKey);

    // Gắn thông tin người dùng đã xác thực vào request để sử dụng trong các xử lý sau này
    console.log("decoded: ", decoded);
    
    // Tiếp tục sang middleware hoặc route kế tiếp
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
