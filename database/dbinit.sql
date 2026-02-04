DROP DATABASE IF EXISTS agrogear;

CREATE DATABASE agrogear
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

USE agrogear;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE attributes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    attribute_name VARCHAR(100) NOT NULL,
    unit VARCHAR(10)
);

CREATE TABLE attribute_values (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    attribute_id INT,
    value VARCHAR(100) NOT NULL,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO users(username, email, password_hash) VALUES
('admin', 'admin@admin.com', '$argon2i$v=19$m=16,t=2,p=1$TVdYbVBvOVRQU0FwNGU4cw$L5hk3i2OEJG5lcjO4wh2ow');

INSERT INTO categories(name) VALUES
('Mezőgazdasági gépek'),
('Kertészeti eszközök'),
('Öntözőrendszerek');

INSERT INTO attributes(attribute_name, unit) VALUES
('Teljesítmény', 'LE'),
('Kapacitás', 'liter'),
('Súly', 'kg');

INSERT INTO products(name, category_id, description, price, stock) VALUES
('Traktor', 1, 'Egy erős mezőgazdasági jármű', 15000.00, 5),
('Vetőgép', 1, 'Magok ültetésére szolgáló gép', 5000.00, 10);

INSERT INTO attribute_values(product_id, attribute_id, value) VALUES
(1, 1, '100'),
(1, 3, '3000'),
(2, 2, '200');