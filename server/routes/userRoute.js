import express from "express";
import { login, logout, register } from "../controllers/userController.js";
import { userTypeValidator } from "../middleware/userType.js";
import { auth } from "../middleware/authorize.js";

const router = express.Router();

router.post("/login", userTypeValidator, login);
router.post("/register", userTypeValidator, register);
router.get("/logout",auth ,logout);

export default router;
