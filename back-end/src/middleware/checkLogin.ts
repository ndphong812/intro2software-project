import { NextFunction, Request, Response } from "express";
import { getRepository} from "typeorm";
import { User } from "../entities/User";
// import dotenv from 'dotenv'

import jwt from "jsonwebtoken";
const config = require("../config/config");
// import { LocalStorage } from "node-localstorage";

// const localStorage = new LocalStorage('./scratch');

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {

  const {token} = req.body;
  // const token = localStorage.getItem('access_token');
  
  
  // console.log(req.headers['authorization']);
  console.log("token: ", req.headers);
  

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
