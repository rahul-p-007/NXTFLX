import z, { success } from "zod";
import bcrypt from "bcryptjs";
import User from "../db/model/user.model.js";
import { generateTokenAndSetCookie } from "../utils/genrateToken.js";
export const SignUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "Missing credentials",
      });
    }
    const alreadyexistUserByEmail = await User.findOne({ email });
    if (alreadyexistUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "User email already exist",
      });
    }

    const alreadyexistUserByusername = await User.findOne({ username });
    if (alreadyexistUserByusername) {
      return res.status(400).json({
        success: false,
        message: "User username already exist",
      });
    }

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const parsePassword = z
      .string()
      .min(5, "Password must be at least 8 character")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/\d/, "Must contain at least one number");

    const inputSchema = z.object({
      username: z.string(),
      email: z.string().email(),
      password: parsePassword,
    });

    const inputValidationSuccessfully = inputSchema.safeParse({
      username,
      email,
      password,
    });

    if (!inputValidationSuccessfully.success) {
      const errorMessage =
        inputValidationSuccessfully.error &&
        inputValidationSuccessfully.error.length > 0
          ? inputValidationSuccessfully.error[0].message
          : "Unknown validation error";

      return res.status(400).json({
        success: false,
        message: "Enter the input fields in correct character",
        error: errorMessage,
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: passwordHash,
      image,
    });

    generateTokenAndSetCookie(user._id, res);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    console.log("Error in signup", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing credentials",
      });
    }

    const ExistUser = await User.findOne({ email });
    if (!ExistUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const comparePassword = await bcrypt.compare(password, ExistUser.password);
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    generateTokenAndSetCookie(ExistUser._id, res);
    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: {
        _id: ExistUser._id,
        username: ExistUser.username,
        email: ExistUser.email,
        image: ExistUser.image,
      },
    });
  } catch (error) {
    console.log("Error in login", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("nextflixToken");
    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log("Error in logout", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
