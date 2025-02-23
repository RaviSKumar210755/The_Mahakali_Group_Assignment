import { Router } from "express";
import ProductOrderController from "../controllers/productOrder.js";

const router = Router();

router.post("/create-productOrder", ProductOrderController);

export default router;
