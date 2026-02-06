import express from "express";
import {
  deleteThumbnail,
  generateThumbnail,
} from "../controllers/thumbnail.controller.js";
const router = express.Router();

router.post("/generate", generateThumbnail);
router.delete("/delete/:id", deleteThumbnail);

export default router;
