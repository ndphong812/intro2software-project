import { Router } from "express";
import OrderListProduct from "../controllers/OrderController";

const router = Router();

router.post("/add", OrderListProduct.order);
router.post("/delete", OrderListProduct.delete);
router.post("/", OrderListProduct.getAll);


export default router;