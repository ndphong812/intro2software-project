import { Router } from "express";
import APICart from "../controllers/CartController"


const router = Router();

router.post("/add", APICart.add);
router.post("/update", APICart.update);
router.post("/delete", APICart.delete);
router.post("/", APICart.getAll);

export default router;