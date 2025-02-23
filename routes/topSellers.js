import { Router } from "express";
import topSellersController from "../controllers/topSellers.js";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
const router = Router();

router.get("/topSellersApi", checkDealerId, topSellersController);

export default router;
