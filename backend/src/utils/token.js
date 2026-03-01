import jwt from "jsonwebtoken";
import env from "../config/env.js";

export function generateToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token){
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error){
    return null;
  }  
}