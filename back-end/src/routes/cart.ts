import { Router } from "express";
import APICart from "../controllers/CartController"

import {checkLogin} from "../middleware/checkLogin";


const router = Router();

router.post("/add", APICart.add);
router.post("/update", APICart.update);
router.post("/delete", APICart.delete);
router.post("/", APICart.getAll);

export default router;