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
    is_admin BOOLEAN DEFAULT FALSE,
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

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
); 

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    products JSON NOT NULL, 
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users(username, email, password_hash, is_admin) VALUES
('admin', 'admin@admin.com', '$argon2i$v=19$m=16,t=2,p=1$TVdYbVBvOVRQU0FwNGU4cw$L5hk3i2OEJG5lcjO4wh2ow', TRUE);

INSERT INTO categories(name) VALUES
('Mezőgazdasági gépek'),
('Kertészeti eszközök'),
('Öntözőrendszerek');

INSERT INTO attributes(attribute_name, unit) VALUES
('Teljesítmény', 'LE'),
('Kapacitás', 'liter'),
('Súly', 'kg'),
('Munkaszélesség', 'cm'),
('Hosszúság', 'm'),
('Garancia', 'év'),
('Üzemanyag', ''),
('Maximális nyomás', 'bar'),
('Vágási magasság', 'mm');

INSERT INTO products(name, category_id, description, price, stock) VALUES
('Traktor', 1, 'Egy erős mezőgazdasági jármű', 15000.00, 5),
('Vetőgép', 1, 'Magok ültetésére szolgáló gép', 5000.00, 10),
('Kombájn', 1, 'Gabona aratására és cséplésére alkalmas gép', 25000.00, 3),
('Permetező gép', 1, 'Növényvédő szer kijuttatására szolgáló eszköz', 3500.00, 8),
('Bálázó', 1, 'Szalma és széna bálázására használatos gép', 8000.00, 6),
('Fűnyíró', 2, 'Benzinmotoros fűnyíró közepes méretű kertekhez', 450.00, 15),
('Motoros sövényvágó', 2, 'Elektromos sövényvágó precíz metszéshez', 280.00, 12),
('Fűkasza', 2, 'Professzionális benzinmotoros fűkasza', 380.00, 20),
('Lapátkészlet', 2, 'Többféle ásó és lapát kertészeti munkákhoz', 120.00, 25),
('Kézi gereblyés', 2, 'Ergonomikus fogantyúval ellátott kerti gereblyés', 45.00, 30),
('Csepegtetőrendszer', 3, 'Automata öntözőrendszer 100m csővel', 890.00, 10),
('Locsolócső', 3, 'Rugalmas kerti locsolócső 50m', 65.00, 40),
('Szivattyú', 3, 'Elektromos kerti szivattyú 1000W teljesítménnyel', 550.00, 8),
('Esőztetőfej készlet', 3, 'Állítható esőztető fejek 10 db-os csomag', 95.00, 35),
('Öntözőautomata', 3, 'Programozható digitális öntözőautomata', 420.00, 12);

INSERT INTO attribute_values(product_id, attribute_id, value) VALUES
(1, 1, '100'),
(1, 3, '3000'),
(1, 6, '3'),
(1, 7, 'Dízel'),
(2, 2, '200'),
(2, 3, '450'),
(2, 4, '300'),
(2, 6, '2'),
(3, 1, '250'),
(3, 3, '8500'),
(3, 4, '520'),
(3, 6, '5'),
(3, 7, 'Dízel'),
(4, 2, '600'),
(4, 3, '180'),
(4, 4, '1200'),
(4, 6, '2'),
(4, 7, 'Benzin'),
(5, 1, '80'),
(5, 3, '950'),
(5, 4, '220'),
(5, 6, '3'),
(5, 7, 'Dízel'),
(6, 1, '5'),
(6, 3, '25'),
(6, 4, '46'),
(6, 6, '2'),
(6, 7, 'Benzin'),
(6, 9, '25-75'),
(7, 1, '2'),
(7, 3, '4'),
(7, 5, '0.6'),
(7, 6, '2'),
(7, 7, 'Elektromos'),
(8, 1, '3'),
(8, 3, '8'),
(8, 6, '2'),
(8, 7, 'Benzin'),
(9, 3, '15'),
(9, 6, '1'),
(10, 3, '2'),
(10, 5, '1.5'),
(10, 6, '1'),
(11, 2, '100'),
(11, 5, '100'),
(11, 6, '3'),
(11, 8, '4'),
(12, 3, '5'),
(12, 5, '50'),
(12, 6, '2'),
(13, 1, '1'),
(13, 3, '12'),
(13, 6, '2'),
(13, 7, 'Elektromos'),
(13, 8, '5'),
(14, 3, '3'),
(14, 6, '1'),
(15, 3, '1'),
(15, 6, '3');

INSERT INTO favorites(user_id, product_id) VALUES
(1, 1);

INSERT INTO orders(user_id, products, total_price) VALUES
(1, '[{"name": "Traktor", "quantity": 1, "price": 15000.00}, {"name": "Vetőgép", "quantity": 2, "price": 5000.00}]', 25000.00);

DELIMITER //

CREATE FUNCTION IF NOT EXISTS magyar_trim(str VARCHAR(255)) RETURNS VARCHAR(255) DETERMINISTIC
BEGIN
    DECLARE result VARCHAR(255);
    SET result = LOWER(str);
    SET result = REPLACE(result, ' ', '');
    SET result = REPLACE(result, 'á', 'a');
    SET result = REPLACE(result, 'é', 'e');
    SET result = REPLACE(result, 'í', 'i');
    SET result = REPLACE(result, 'ó', 'o');
    SET result = REPLACE(result, 'ö', 'o');
    SET result = REPLACE(result, 'ő', 'o');
    SET result = REPLACE(result, 'ú', 'u');
    SET result = REPLACE(result, 'ü', 'u');
    SET result = REPLACE(result, 'ű', 'u');
    RETURN result;
END //

DELIMITER ;