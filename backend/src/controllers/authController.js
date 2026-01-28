import pool from "../config/db.js";
import argon2 from "argon2";
import { generateToken } from "../utils/token.js";

export async function register(req, res, next){

}

export async function login(req, res, next){

}

export async function logout(req, res, next){
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}
