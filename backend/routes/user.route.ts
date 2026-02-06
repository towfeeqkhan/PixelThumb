import express from "express";
import {
  getUserThumbnailById,
  getUserThumbnails,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/auth.js";
const router = express.Router();

router.get("/thumbnails", protectRoute, getUserThumbnails);
router.get("/thumbnail/:id", protectRoute, getUserThumbnailById);

export default router;
