import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login User function
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    //Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //Create a token for the user
    const token = createToken(user._id);
    //Sending the response to the user
    res.json({
      success: true,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to Login",
    });
  }
};

//Create JWT token function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register User function
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Check if user already exists
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //Validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email, Pleas Provide a valid email",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Weak password, Please provide a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols.",
      });
    }

    //Encrypting the password to store in the database
    //hashing user password
    const salt = await bcrypt.genSalt(10); //5-15, the higher the better
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creating a  new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //Save the user to the database
    const user = await newUser.save();
    const token = createToken(user._id);
    //Sending the response to the user
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

export { loginUser, registerUser };
