import express from "express";
import {
  deleteThumbnail,
  generateThumbnail,
} from "../controllers/thumbnail.controller.js";
import protectRoute from "../middlewares/auth.js";
const router = express.Router();

router.post("/generate", protectRoute, generateThumbnail);
router.delete("/delete/:id", protectRoute, deleteThumbnail);

export default router;
