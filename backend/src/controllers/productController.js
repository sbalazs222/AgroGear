import pool from "../config/db.js";

export async function getProductsByCategory(req, res) {
    const { category } = req.params;
    const formatedCategory = category.toLowerCase().trim();
    const [products] = await pool.query('SELECT p.id, p.name, p.description, p.price, p.stock FROM products p INNER JOIN categories c ON c.id = p.category_id WHERE magyar_trim(c.name) = ?', [formatedCategory]);
    res.status(200).json({ message: "Succesful query", data: products });
}

export async function newProduct(req, res) {
    const { name, description, price, stock, category } = req.body;
    if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({ message: "Price and stock must be numbers" });
    }
    const [categoryExists] = await pool.query('SELECT id FROM categories WHERE magyar_trim(name) = ?', [category.toLowerCase().trim()]);
    if (categoryExists.length != 0 ){
        const categoryId = categoryExists[0].id;
        await pool.query('INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)', [name, description, price, stock, categoryId]);
        return res.status(201).json({ message: "Product created successfully" });
    } else {
        const [newCategory] = await pool.query('INSERT INTO categories (name) VALUES (?)', [category.toLowerCase().trim()]);
        const categoryId = newCategory.insertId;
        await pool.query('INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)', [name, description, price, stock, categoryId]);
        return res.status(201).json({ message: "Product and category created successfully" });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;
    const [product] = await pool.query('SELECT id FROM products WHERE id = ?', [id]);
    if (product.length == 0) {
        return res.status(404).json({ message: "Product not found" });
    }
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return res.status(200).json({ message: "Product deleted successfully" });
}

export async function sellProduct(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    if (isNaN(quantity)) {
        return res.status(400).json({ message: "Quantity must be a number" });
    }
    const [product] = await pool.query('SELECT stock FROM products WHERE id = ?', [id]);
    if (product.length == 0) {
        return res.status(404).json({ message: "Product not found" });
    }
    if (product[0].stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
    }
    await pool.query('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, id]);
    res.status(200).json({ message: "Product sold successfully" });
}