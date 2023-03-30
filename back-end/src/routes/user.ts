import { Router } from "express";
import UserController from "../controllers/UserController";


const router = Router();


// Get user by id
router.get("/:id",UserController.getOneById);

//Create a new user
router.post("/add", UserController.newUser);

//delete a user
router.get("/delete/:id", UserController.deleteUser);

//edit a user
router.post("/edit", UserController.editUser);

//Get all users
router.get("/", UserController.listAll);


export default router;