// controllers/userController.js
// const User = require('../models/user');
// const bcrypt = require('bcrypt');
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";



export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: "Email already in use" });
      }
      const hashedPassword = await bcrpyt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "customer",
      });
      await newUser.save();
      res.status(201).json({
        message: "User created Successfully",
        user: newUser,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };
  
  export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          Error: "Invalid email or password",
        });
      }
      const isPasswordValid = await bcrpyt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          userName: user.name,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        message: "User login  Successfully",
        token,
      });
    } catch (error) {
      console.log("Error log in  user", error.message);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  };

// Get user profile
export const getUserProfile = async (req, res) => {
 try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};
