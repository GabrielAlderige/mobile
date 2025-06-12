import express from "express"
import { createTransaction, deleteTransactions, getSummaryByUserId, getTransactionsById } from "../controllers/transactionsControler.js";

const router = express.Router()


router.get("/:userId", getTransactionsById);
router.post("/", createTransaction);
router.delete("/:id", deleteTransactions);
router.get("/summary/:userId", getSummaryByUserId)

export default router