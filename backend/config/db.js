import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://hafsaiffath21:HafsaIffath21@cluster0.mvl5m9d.mongodb.net/food-del"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    });
};
