import { Router } from "express";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
import totalSellerController from "../controllers/totalSeller.js";
const router = Router();

router.get("/totalSellerApi", checkDealerId, totalSellerController);

export default router;
