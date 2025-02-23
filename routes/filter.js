import { Router } from "express";
import {
  dateFilter,
  earnFilter,
  sellerCategoryFilter,
} from "../controllers/filter.js";
import {
  filterByDate,
  filterByEarningThreshold,
  filterBySellerCategory,
} from "../middlewares/filterMiddleware.js";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
const router = Router();

router.get("/filter/date", checkDealerId, filterByDate, dateFilter);
router.get(
  "/filter/earning",
  checkDealerId,
  filterByEarningThreshold,
  earnFilter
);
router.get(
  "/filter/seller_category",
  checkDealerId,
  filterBySellerCategory,
  sellerCategoryFilter
);

export default router;
