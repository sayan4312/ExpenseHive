import express from "express";
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controller/transactioncontroller.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", addTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
