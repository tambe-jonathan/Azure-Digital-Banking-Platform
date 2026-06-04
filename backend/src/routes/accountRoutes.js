import { Router } from "express";
import { getAccount } from "../controllers/accountController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAccount);

export default router;
