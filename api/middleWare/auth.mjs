import jwt from "jsonwebtoken";
import { User } from "../Models/userModel.js";
import asyncHandler from "express-async-handler";

const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    req.user =  await User.findById(payload.id).select("-password")
    next();
  } catch (error) {
    throw new Error("Authentication Invalid");
  }
});

export default auth;
