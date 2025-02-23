import { Router } from "express";
import totalEarningController from "../controllers/totalEarning.js";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
const router = Router();

router.get("/totalEarningApi", checkDealerId, totalEarningController);

export default router;
