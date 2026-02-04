import pool from "../config/db.js";

export async function getProductsByCategory(req, res, next) {
    const { category } = req.params;
    const formatedCategory = category.toLowerCase().trim();
    const [products] = await pool.query('SELECT p.id, p.name, p.description, p.price, p.stock FROM products p INNER JOIN categories c ON c.id = p.category_id WHERE magyar_trim(c.name) = ?', [formatedCategory]);
    res.json({ products });
}