import express from "express";
import { subscribePlan, getUserSubscriptions } from "../controllers/subscriptionController";
import { authMiddleWare } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleWare, subscribePlan);
router.get("/my-subscriptions", authMiddleWare, getUserSubscriptions);

export default router;
