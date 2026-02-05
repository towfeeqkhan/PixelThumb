import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/user.model.js";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    req.session.isLoggedIn = true;
    req.session.userId = newUser._id.toString();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    req.session.isLoggedIn = true;
    req.session.userId = user._id.toString();

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
