import { Router } from "express";
import sellerDetailsController from "../controllers/sellerDetails.js";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
const router = Router();

router.get("/sellerDetailsApi", checkDealerId, sellerDetailsController);

export default router;
