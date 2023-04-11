import { Router } from "express";
import APIProduct from "../controllers/ProductController"
import {checkAdmin} from "../middleware/checkAdmin";
import {checkSeller} from "../middleware/checkSeller";

const router = Router();

// for admin
router.get("/listNeedAccept/:emailAdmin/:idAdmin", checkAdmin, APIProduct.getProductNoAccept);
router.post("/acceptListProduct", checkAdmin, APIProduct.acceptListProduct);

//for seller
router.post("/add", checkSeller, APIProduct.add);
router.post("/update", checkSeller, APIProduct.update);
router.post("/delete", checkSeller, APIProduct.delete);

//for user
router.post("/search", APIProduct.search);
router.get("/:idProduct", APIProduct.getByID);
router.get("/", APIProduct.getAll);

export default router;