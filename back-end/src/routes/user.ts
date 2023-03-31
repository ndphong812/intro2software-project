import { Router } from "express";
import UserController from "../controllers/UserController";

import {checkAdmin} from "../middleware/checkAdmin";

const router = Router();

// To secure, we need email, user_id of admin.
//delete a user
router.get("/delete/:emailAdmin/:idAdmin/:idUser", checkAdmin, UserController.deleteUser);

// Get user by id
router.get("/:emailAdmin/:idAdmin/:idUser", checkAdmin,UserController.getOneById);

//Get all users
router.get("/:emailAdmin/:idAdmin", checkAdmin, UserController.listAll);

//Create a new user
router.post("/add", checkAdmin, UserController.newUser);

//edit a user
router.post("/edit", checkAdmin, UserController.editUser);




export default router;