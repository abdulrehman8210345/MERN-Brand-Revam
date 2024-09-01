import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import { auth } from "./middleware/authorize.js";
import { authorizeRole } from "./middleware/authRole.js";
import customerRoute from "./routes/customerRoute.js"
import vendorRoute from "./routes/vendorRoute.js"
const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Server is up and running",
  });
});

app.use("/api/auth", userRouter);
app.use("/api/customer/dashboard",auth,authorizeRole("customer"),customerRoute);
app.use("/api/vendor/dashboard",auth,authorizeRole("vendor"),vendorRoute);
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});
