import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const auth = async (req, res, next) => {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    return res.status(401).json({ message: "User is not authorized" });
  }

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedToken._id);
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
