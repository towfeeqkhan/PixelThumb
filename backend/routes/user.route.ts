import express from "express";
import {
  getUserThumbnailById,
  getUserThumbnails,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/thumbnails", getUserThumbnails);
router.get("/thumbnail/:id", getUserThumbnailById);

export default router;
