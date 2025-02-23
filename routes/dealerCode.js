import { Router } from "express";
import dealerCodeController from "../controllers/dealerCode.js";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
const router = Router();

router.get("/dealerCodeApi", checkDealerId, dealerCodeController);

export default router;
