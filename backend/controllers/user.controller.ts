import { Request, Response } from "express";
import Thumbnail from "../models/thumbnail.model.js";

export const getUserThumbnails = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    const thumbnails = await Thumbnail.find({ userId }).sort({ createdAt: -1 });

    if (!thumbnails) {
      return res
        .status(404)
        .json({ message: "No thumbnails found for this user" });
    }
    res.json(thumbnails);
  } catch (error: any) {
    console.error("Error fetching user thumbnails:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserThumbnailById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const { id } = req.params;

    const thumbnail = await Thumbnail.findOne({ _id: id, userId });
    if (!thumbnail) {
      return res.status(404).json({ message: "Thumbnail not found" });
    }

    res.json(thumbnail);
  } catch (error: any) {
    console.error("Error fetching user thumbnail by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
