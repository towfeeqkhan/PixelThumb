import MongoStore from "connect-mongo";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import session from "express-session";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import thumbnailRouter from "./routes/thumbnail.route.js";
import userRouter from "./routes/user.route.js";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}

await connectDB();

const app = express();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      process.env.BACKEND_URL || "http://localhost:3000",
    ],
    credentials: true,
  }),
);

// Trust proxy (required for secure cookies behind proxies like Nginx/Vercel/Heroku)
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // None for cross-site
      httpOnly: true,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string,
      collectionName: "sessions",
    }),
  }),
);

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

app.use("/api/auth", authRouter);
app.use("/api/thumbnail", thumbnailRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
