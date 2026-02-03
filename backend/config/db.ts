import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.MONGO_URI;

    if (!connStr) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(connStr);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
