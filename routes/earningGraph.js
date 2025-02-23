import { Router } from "express";
import earningGraphController from "../controllers/earningGraph.js";
import checkDealerId from "../middlewares/dealerIdMiddleware.js";
const router = Router();

router.get("/earningGraphApi", checkDealerId, earningGraphController);

export default router;
