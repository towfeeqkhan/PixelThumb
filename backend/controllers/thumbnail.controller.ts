import { Request, Response } from "express";
import Thumbnail from "../models/thumbnail.model.js";

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const {
      title,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });
  } catch (error) {
    console.error("Error generating thumbnail:", error);
    res.status(500).json({ message: "Failed to generate thumbnail" });
  }
};
