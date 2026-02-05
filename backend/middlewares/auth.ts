import { NextFunction, Request, Response } from "express";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { isLoggedIn, userId } = req.session;

  if (!isLoggedIn || !userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  next();
};

export default protectRoute;
