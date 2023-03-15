import { Router } from "express";
import APIProduct from "../controllers/ProductController"

const router = Router();

router.post("/add", APIProduct.add);
router.post("/update", APIProduct.update);
router.post("/delete", APIProduct.delete);
router.get("/:idProduct", APIProduct.getByID);
router.get("/", APIProduct.getAll);

export default router;
