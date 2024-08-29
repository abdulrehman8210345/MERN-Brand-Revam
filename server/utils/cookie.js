import { generateToken } from "./token.js";

export const setCookie = (req, res, user, _id, message) => {
  const token = generateToken(_id, user.userType);

  return res
    .status(200)
    .cookie("authToken", token, {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      // httpOnly: true,
      // sameSite: "none",
      // secure: true,
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};
