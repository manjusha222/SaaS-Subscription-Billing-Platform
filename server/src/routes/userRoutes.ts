import express from "express"
import { getProfile,updateProfile } from "../controllers/userController"
import { authMiddleWare } from "../middleware/authMiddleware";

const router = express.Router();
//Get logged in user profile

router.get("/profile",authMiddleWare,getProfile);

// update profile

router.put("/profile",authMiddleWare,updateProfile);

export default router;