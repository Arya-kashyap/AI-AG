import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup =async (req, res) => {
     const {firstName, lastName, email, password} = req.body;
     try {
          if (!firstName || !lastName || !email || !password) {
               return res.status(400).json({errors: "All fields are required"});
          }
          const exitingUser = await User.findOne({email:email});
          if (exitingUser) {
               return res.status(400).json({errors: "User already exists"});
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          if (!hashedPassword) {
               return res.status(500).json({errors: "Error hashing password"});
          }
          const newUser = new User({
               firstName, 
               lastName, 
               email, 
               password: hashedPassword
          });
          await newUser.save();
          return res.status(201).json({message: "User created successfully", newUser});
     } catch (error) {
          res.status(500).json({errors: "Server error"});
          console.error("Error during signup:", error);
     }
     
}

export const login =async (req, res) => {
     const {email, password} = req.body;
     try {
          if (!email || !password) {
               return res.status(400).json({errors: "Email and password are required"});
          }
          const findUser = await User.findOne({email:email});
          if (!findUser) {
               return res.status(400).json({errors: "User not found"});
          }
          const isPasswordValid = await bcrypt.compare(password, findUser.password);
          if (!isPasswordValid) {
               return res.status(400).json({errors: "Invalid password"});
          }
          // Generate JWT token
          if (!process.env.JWT_SECRET) {
               return res.status(500).json({errors: "JWT secret is not defined"});
          }
          const token = jwt.sign(
               {userId: findUser._id},
               process.env.JWT_SECRET,
               {expiresIn: '1d'}
          );
          const cookieOptions = {
               expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
               sameSite: "Strict" // Prevent CSRF attacks
          };
          res.cookie('token', token, cookieOptions);
          return res.status(200).json({
               message: "Login successful", token
          });
     } catch (error) {
          res.status(500).json({errors: "Server error"});
          console.error("Error during login:", error);
     }
}

export const logout = (req, res) => {
     try {
          res.clearCookie('token');
          return res.status(200).json({message: "Logout successful"});
     } catch (error) {
          res.status(500).json({errors: "Server error"});
          console.error("Error during logout:", error);
     }
}