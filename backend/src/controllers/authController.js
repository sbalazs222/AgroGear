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
    await pool.query('INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)', [email, username, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  }
  catch(err){
    next(err);
  }
}

export async function login(req, res, next){
  const {email, password} = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const [user] = await pool.query('SELECT id, username, password_hash FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!await argon2.verify(user[0].password_hash, password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken({ id: user[0].id, username: user[0].username });
    res.cookie("token", token, { httpOnly: true, secure: false, sameSite: 'strict' });
    res.status(200).json({ message: "Login successful" });
  }
  catch (err) {
    next(err);
  }
}

export async function logout(req, res, next){
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}
