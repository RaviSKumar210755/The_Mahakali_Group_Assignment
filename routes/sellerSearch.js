import { Router } from "express";
import sellerSearchController from "../controllers/sellerSearch.js";
import sellerSearchMiddleware from "../middlewares/sellerSearchMiddleware.js";
const router = Router();

router.get("/sellerSearchApi", sellerSearchMiddleware, sellerSearchController);

export default router;
