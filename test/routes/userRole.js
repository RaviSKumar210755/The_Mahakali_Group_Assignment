import { Router } from "express";
const router = Router();
import userRoleController from "../controllers/userRole.js";

router.post("/create-user-role", userRoleController);

export default router;
