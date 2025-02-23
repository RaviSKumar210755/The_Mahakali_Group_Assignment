import { Router } from "express";
const router = Router();
import createUserController from "../controllers/createUser.js";

router.post("/create-user", createUserController);

export default router;
