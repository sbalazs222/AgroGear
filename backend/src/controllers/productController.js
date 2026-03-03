import pool from "../config/db.js";

export async function getProductsByCategory(req, res) {
    const { category } = req.params;
    const formatedCategory = category.toLowerCase().trim();
    const [products] = await pool.query('SELECT p.id, p.name, p.description, p.price, p.stock FROM products p INNER JOIN categories c ON c.id = p.category_id WHERE magyar_trim(c.name) = ?', [formatedCategory]);
    res.status(200).json({ message: "Succesful query", data: products });
}

async function getProductById(productId) {
    const [products] = await pool.query('SELECT p.id, p.name, p.description, p.price, p.stock FROM products p WHERE p.id = ?', [productId]);
    if (products.length == 0) {
        return null;
    }
    const product = products[0];
    const attributes = await getAttributes(productId);
    product.attributes = attributes;
    return product;
}

export async function searchByName(req, res) {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: "Name parameter is required" });
    }
    const [products] = await pool.query(
        'SELECT id, name, description, price, stock FROM products WHERE magyar_trim(name) LIKE ?', [name.toLowerCase().trim() + '%']
    );
    res.status(200).json({ message: "Successful query", data: products });
}

export async function getproductData(req, res) {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Successful query", data: product });
}

export async function newProduct(req, res) {
    const connection = await pool.getConnection();
    
    try {
        // Validate input
        const { name, description, price, stock, category, attributes } = req.body;
        
        if (!name || !description || !category) {
            return res.status(400).json({ message: "Name, description, and category are required" });
        }
        
        if (isNaN(price) || isNaN(stock) || price < 0 || stock < 0) {
            return res.status(400).json({ message: "Price and stock must be non-negative numbers" });
        }
        
        if (!Array.isArray(attributes)) {
            return res.status(400).json({ message: "Attributes must be an array" });
        }

        await connection.beginTransaction();

        // Check if category exists
        const [categoryExists] = await connection.query('SELECT id FROM categories WHERE magyar_trim(name) = ?', [category.toLowerCase().trim()]);
        let categoryId;

        if (categoryExists.length != 0) {
            categoryId = categoryExists[0].id;
        } else {
            // Create category if needed
            let newCategoryName = category.toLowerCase().trim();
            newCategoryName = newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1);
            const [categoryResult] = await connection.query('INSERT INTO categories (name) VALUES (?)', [newCategoryName]);
            categoryId = categoryResult.insertId;
        }

        // Get existing attributes
        const [existingAttributes] = await connection.query('SELECT id, attribute_name FROM attributes');

        // Create missing attributes
        for (const attr of attributes) {
            const attrName = Object.keys(attr)[0];
            const attrNameLower = attrName.toLowerCase().trim();
            
            const exists = existingAttributes.some(existingAttr => 
                existingAttr.attribute_name.toLowerCase() === attrNameLower
            );
            
            if (!exists) {
                const formattedAttrName = attrNameLower.charAt(0).toUpperCase() + attrNameLower.slice(1);
                const unit = Object.values(attr)[0][1];
                await connection.query('INSERT INTO attributes (attribute_name, unit) VALUES (?, ?)', [formattedAttrName, unit]);
            }
        }

        // Create product
        const [productResult] = await connection.query(
            'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)', 
            [name, description, price, stock, categoryId]
        );
        const productId = productResult.insertId;

        // Link attributes to product
        for (const attr of attributes) {
            const attrName = Object.keys(attr)[0].toLowerCase().trim();
            const attrValue = Object.values(attr)[0][0];
            
            const [attribute] = await connection.query(
                'SELECT id FROM attributes WHERE magyar_trim(attribute_name) = ?', 
                [attrName]
            );
            
            if (attribute.length > 0) {
                await connection.query(
                    'INSERT INTO attribute_values (product_id, attribute_id, value) VALUES (?, ?, ?)', 
                    [productId, attribute[0].id, attrValue]
                );
            }
        }

        await connection.commit();
        res.status(201).json({ message: "Product created successfully" });
        
    } catch (error) {
        await connection.rollback();
    } finally {
        connection.release();
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

export async function sellBasket(req, res) {
    const { products } = req.body;
    let totalPrice = 0;
    if (products.length == 0) {
        return res.status(400).json({ message: "No products provided" });
    }
    const [getStocks] = await pool.query('SELECT id, stock FROM products WHERE id IN (?)', [products.map(p => p.id)]);
    for (const item of products) {
        const product = await getProductById(item.id);
        if (!product) {
            return res.status(404).json({ message: `Product with ID ${item.id} not found` });
        }
        const stock = getStocks.find(p => p.id === item.id)?.stock || 0;
        if (stock < item.quantity) {
            return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
        }
        await pool.query('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.id]);
        totalPrice += product.price * item.quantity;
    }
    await pool.query('INSERT INTO orders (user_id, products, total_price) VALUES (?, ?, ?)', [req.user.id, JSON.stringify(products), totalPrice]);
    res.status(200).json({ message: "Basket checked out successfully" });
}

async function getAttributes(productId) {
    const [attributes] = await pool.query(
        'SELECT a.attribute_name, a.unit, av.value FROM attributes a INNER JOIN attribute_values av ON a.id = av.attribute_id WHERE av.product_id = ?', [productId]
    );
    return attributes;
}