import { Router } from "express";
import AcceptSeller from "../controllers/AcceptRegSellerController";

const router = Router();

router.post("/accept", AcceptSeller.accept);

export default router;