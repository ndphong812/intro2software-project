import { Router } from "express";
import AuthController from "../controllers/AuthController";


const router = Router();

//Login route
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", AuthController.logout);
router.get("/verify-email/:token", AuthController.verifyEMail);
router.post("/verify-login-token", AuthController.verifyLoginToken);
router.post("/forgot-password", AuthController.fotgotPassword);
router.post("/admin", AuthController.checkIsAdmin);

//Change my password
router.post("/change-password", AuthController.changePassword);

export default router;