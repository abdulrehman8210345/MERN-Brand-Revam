import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, { dbName: "BrandRevam_MERN_stack" })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Error while connecting to database", err);
    });
};
