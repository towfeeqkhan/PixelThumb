import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify", protectRoute, verifyUser);
router.post("/logout", protectRoute, logoutUser);

export default router;
