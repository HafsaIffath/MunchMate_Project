import { log } from "console";
import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    // image: req.body.image,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to add food item" });
  }
};

//add food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch food items" });
  }
};

//delete food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body._id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body._id);

    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete food item" });
  }
};

export { addFood, listFood, removeFood };
