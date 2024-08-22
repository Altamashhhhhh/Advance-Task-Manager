const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth.middleware")
userRouter.get("/allusers", auth ,  async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({user});
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users data", error });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new userModel({ name, email, password });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user", error });
  }
});

userRouter.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email , password });
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        const token = jwt.sign({name : user.name , email : user.email} , process.env.SECRET_KEY , {expiresIn : "1h"})
        return res.status(200).json({ message: "User logged in successfully", token });
    }catch(error){
        return res.status(500).json({ message: "Error logging in user", error });
    }
});

module.exports = userRouter;
