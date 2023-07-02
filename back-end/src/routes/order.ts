import { Router } from "express";
import OrderListProduct from "../controllers/OrderController";
import {checkUpdate} from "../middleware/checkUpdateProfile";
import {checkSeller} from "../middleware/checkSeller";

const router = Router();

router.post("/add", checkUpdate, OrderListProduct.order);
router.post("/delete", OrderListProduct.delete);
router.post("/history", OrderListProduct.historyOrder);
router.post("/update", checkSeller, OrderListProduct.updateStatus);
router.post("/orderSeller", checkSeller, OrderListProduct.getAllOrderSeller);
router.post("/complete", OrderListProduct.getAllCompleteSeller);
router.post("/", OrderListProduct.getAll);
export default router;