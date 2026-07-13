import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  console.time("LOGIN");

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.timeEnd("LOGIN");
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }

    console.time("Find User");
    const user = await User.findOne({ email });
    console.timeEnd("Find User");

    if (!user) {
      console.timeEnd("LOGIN");
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    console.time("Compare Password");
    const isMatch = await bcryptjs.compare(password, user.password);
    console.timeEnd("Compare Password");

    if (!isMatch) {
      console.timeEnd("LOGIN");
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    console.time("Generate JWT");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.timeEnd("Generate JWT");

    console.timeEnd("LOGIN");

    return res
      .status(200)
      .cookie("token", token)
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.timeEnd("LOGIN");
    console.log(error);
  }
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      message: "User logged out successfully.",
      success: true,
    });
};

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(401).json({
        message: "Invalid data",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        message: "This email is already used",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
