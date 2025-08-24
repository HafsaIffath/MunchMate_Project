import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";

import "dotenv/config.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
//It is used to parse incoming requests with JSON payloads.
app.use(express.json());
//We can access backend API from frontend using CORS.
app.use(cors());

//db connection
connectDB();

//API routes

//api endpoints
//For food route
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
//For user route
app.use("/api/user", userRouter);
//For cart route
app.use("/api/cart", cartRouter);
//For order route
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//mongodb+srv://hafsaiffath21:HafsaIffath21@cluster0.mvl5m9d.mongodb.net/?
