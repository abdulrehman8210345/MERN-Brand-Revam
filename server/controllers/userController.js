import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/cookie.js";

export const register = async (req, res) => {
  const { name, email, password, userType } = req.body;
  if (!name || !email || !password || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  //hashed Password

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    userType,
  });
  const userObject = user.toObject();
  delete userObject.password;

  //to generate token and set cookie

  setCookie(
    req,
    res,
    userObject,
    user._id,
    `${user.userType} registered successfully`
  );
};

export const login = async (req, res) => {
  const { email, password, userType } = req.body;
  if (!email || !password || !userType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  const isUserExist = await User.findOne({ email, userType });

  if (!isUserExist) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  //hashed Password

  const isPasswordCorrect = await bcrypt.compare(
    password,
    isUserExist.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const userObject = isUserExist.toObject();
  delete userObject.password;

  //to generate token and set cookie

  setCookie(
    req,
    res,
    userObject,
    isUserExist._id,
    `${isUserExist.userType} login successfully`
  );
};

export const logout = (req, res) => {
  try {
    // to check whether user exist or not 
    if (req.cookies.authToken) {
      res.clearCookie("authToken");
      return res.status(200).json({ message: "User logged out successfully" });
    }

    return res.status(400).json({ message: "No user logged in" });
  } catch (error) {
    console.log("Error during logout", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

