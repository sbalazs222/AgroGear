import pool from "../config/db.js";

export async function getUserData(req, res) {
    const [data] = await pool.query('SELECT username FROM users WHERE id = ?', [req.user.id]);
    res.status(200).json({message: 'Succesful query', data: data});
}