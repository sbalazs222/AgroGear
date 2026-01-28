import pool from "../config/db.js";
import argon2 from "argon2";
import { generateToken } from "../utils/token.js";
import validate from "psgutil";

export async function register(req, res, next){
  const {email, username, password} = req.body;
  if (typeof email !== "string" || typeof password !== "string" || typeof username !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }
  if (!validate('email', email)) return res.status(400).json({ message: "Invalid email format" });
  if (!validate('username', username)) return res.status(400).json({ message: "Invalid username format" });
  if (!validate('password', password)) return res.status(400).json({ message: "Password does not meet criteria" });
  try{
    const [exists] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
    if (exists.length > 0) {
      return res.status(409).json({ message: "Email or username already in use" });
    }
    const hashedPassword = await argon2.hash(password);
    await pool.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  }
  catch(err){
    next(err);
  }
}

export async function login(req, res, next){

}

export async function logout(req, res, next){
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}
