import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

//add items to user cart
cartRouter.post("/add", authMiddleware, addToCart);
//remove items from user cart
cartRouter.post("/remove", authMiddleware, removeFromCart);
//Fetch user cart data
cartRouter.post("/get", authMiddleware, getCart);

export default cartRouter;
