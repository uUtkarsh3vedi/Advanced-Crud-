const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const Blacklist = require('../models/Blacklist')
const RefreshToken = require('../models/refereshToken')
require("dotenv").config();

const SignUp = async (req, res) => {
  const { name, email, userName, password } = req.body;
  try {
    let user = await User.findOne({ $or: [{ userName }, { email }] });
    if (user) {
      return res.status(400).json({ msg: "Username or Email already exists" });
    }
    user = new User({
      name,
      userName,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ msg: "User is signed up successfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendSuccessEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: "Login Successful", // Email subject
    text: `Hello ${name},\n\nYou have successfully logged in to your account.\n\nBest regards,\nYour Company`, // Email body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Login success email sent!");
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

const Login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    let user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "User is not matched" });
    }
    const payLoad = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await sendSuccessEmail(user.email, user.name);
    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error ");
  }
};

const EditUser = async (req, res) => {
  const { name, userName, email, password } = req.body;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ msg: "User ID is required in the header" });
  }

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name) user.name = name;
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Error updating the user" });
  }
};

const DeleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send({ msg: "User deleted Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: "Error Deleting the User " });
  }
};

const viewTeamProfile = async(req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if(user.role !=='Manager'){
      return res.status(403).josn({msg:"Access forbidden only managers can view it "})
    }
    const teamProfiles = await User.find({teamId: user.teamId});
    res.status(200).json({teamProfiles})
  } catch (error) {
    console.error('View Team Priofiles error',error.message)
    res.status(500).json({msg:"Server Error"})
    
  }

}

const Logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.body.refreshToken;

    if (!token) {
      return res.status(400).json({ msg: "Access token not provided" });
    }

    const blacklistedToken = new BlackList({ token });
    await blacklistedToken.save();

    if (refreshToken) {
      await RefreshToken.findOneAndDelete({ token: refreshToken });
    }

    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ msg: "Server error during logout" });
  }
};
module.exports = { SignUp, Login, DeleteUser, EditUser, Logout ,viewTeamProfile};
