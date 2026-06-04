import { Router } from "express";
import {
  getTransactions,
  transferFunds,
} from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getTransactions);
router.post("/transfer", authMiddleware, transferFunds);

export default router;
