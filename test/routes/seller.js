import { Router } from "express";
import createSellerController from "../controllers/seller.js";
const router = Router();

router.post("/create-seller", createSellerController);

export default router;
