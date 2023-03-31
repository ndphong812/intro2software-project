import { Router } from "express";
import APICart from "../controllers/CartController"

import {checkAdmin} from "../middleware/checkAdmin";

const router = Router();

router.post("/add", checkAdmin, APICart.add);
router.post("/update", APICart.update);
router.post("/delete", APICart.delete);
router.post("/", APICart.getAll);

export default router;