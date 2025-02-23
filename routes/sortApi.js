import { Router } from "express";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
import {
  sortbySales,
  sortbyOrders,
  sortbyEarnings,
  sortbyName,
} from "../controllers/sortApi.js";
const router = Router();
router.get("/sortApi/sales", checkDealerId, sortbySales);
router.get("/sortApi/orders", checkDealerId, sortbyOrders);
router.get("/sortApi/earnings", checkDealerId, sortbyEarnings);
router.get("/sortApi/sellerName", checkDealerId, sortbyName);

export default router;
