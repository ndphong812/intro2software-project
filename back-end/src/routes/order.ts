import { Router } from "express";
import OrderListProduct from "../controllers/OrderController";
import {checkUpdate} from "../middleware/checkUpdateProfile";

const router = Router();

router.post("/add", checkUpdate, OrderListProduct.order);
router.post("/delete", OrderListProduct.delete);
router.post("/update", OrderListProduct.updateStatus);
router.post("/history", OrderListProduct.historyOrder);
router.post("/", OrderListProduct.getAll);


export default router;