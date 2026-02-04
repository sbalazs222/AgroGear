import pool from "../config/db.js";

export async function getProductsByCategory(req, res, next) {
    const { category } = req.params;
    const [products] = await pool.query();
}