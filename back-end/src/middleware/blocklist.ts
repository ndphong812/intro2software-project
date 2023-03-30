import { NextFunction } from "express";
import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./scratch');

export const blockedTokens = new Set();

// Middleware để kiểm tra danh sách chặn
export function blocklist(req: Request, res: Response, next: NextFunction) {

    const token = localStorage.getItem('access_token');
    if (blockedTokens.has(token)) {
        return res.status(401).send({
            status: "Failed",
            message: "Unauthorized"
        });
    }
    next();
}