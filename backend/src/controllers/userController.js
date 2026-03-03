import pool from "../config/db.js";

export async function getUserData(req, res) {
    const [data] = await pool.query('SELECT username FROM users WHERE id = ?', [req.user.id]);
    res.status(200).json({message: 'Successful query', data: data});
}

export async function getFavourites(req, res) {
    const [favourites] = await pool.query(
        'SELECT p.id, p.name, p.description, p.price, p.stock FROM products p INNER JOIN favorites f ON p.id = f.product_id WHERE f.user_id = ?', [req.user.id]
    );
    res.status(200).json({ message: "Successful query", data: favourites });
}

export async function setFavourite(req, res) {
    const { productId } = req.body;
    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }
    const [existingFavourite] = await pool.query('SELECT id FROM favorites WHERE user_id = ? AND product_id = ?', [req.user.id, productId]);
    if (existingFavourite.length > 0) {
        await pool.query('DELETE FROM favorites WHERE id = ?', [existingFavourite[0].id]);
        return res.status(200).json({ message: "Product removed from favourites successfully" });
    }
    await pool.query('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)', [req.user.id, productId]);
    res.status(200).json({ message: "Product added to favourites successfully" });
}

export async function getOrders(req, res) {
    const [orders] = await pool.query(
        'SELECT id AS order_id, products, total_price, created_at AS order_date FROM orders WHERE user_id = ?', [req.user.id]
    );
    orders.forEach(order => {
        order.products = JSON.parse(order.products);
    });
    res.status(200).json({ message: "Successful query", data: orders });
}