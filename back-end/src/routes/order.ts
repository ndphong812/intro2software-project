import { Router } from "express";
import OrderListProduct from "../controllers/OrderController";

const router = Router();

router.post("/", OrderListProduct.order);


export default router;