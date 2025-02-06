CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    direccion VARCHAR(255)
);

CREATE TABLE producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL
);

-- Insertar clientes
INSERT INTO cliente (nombre, email, direccion) VALUES
('Juan Pérez', 'juan.perez@example.com', 'Av. Siempre Viva 123, Lima'),
('María Gómez', 'maria.gomez@example.com', 'Calle Falsa 456, Bogotá'),
('Carlos Ramírez', 'carlos.ramirez@example.com', 'Cra. 78 #12-34, Ciudad de México');

-- Insertar productos
INSERT INTO producto (nombre, descripcion, precio) VALUES
('Laptop Lenovo', 'Laptop de 15 pulgadas con procesador Intel i5', 1200.00),
('Monitor Samsung', 'Monitor LED Full HD de 24 pulgadas', 300.00),
('Teclado Mecánico', 'Teclado mecánico retroiluminado con switches rojos', 85.00),
('Mouse Logitech', 'Mouse inalámbrico ergonómico', 40.00),
('Auriculares Sony', 'Auriculares con cancelación de ruido', 200.00),
('Impresora HP', 'Impresora multifuncional con WiFi', 150.00),
('Silla Gamer', 'Silla ergonómica para gaming', 250.00),
('Smartphone Samsung', 'Celular con pantalla AMOLED 120Hz', 850.00),
('Tablet iPad', 'iPad de 10.2 pulgadas, 64GB', 400.00),
('Disco SSD 1TB', 'Unidad de estado sólido NVMe 1TB', 130.00),
('Memoria RAM 16GB', 'Módulo de memoria DDR4 3200MHz', 75.00),
('Fuente de Poder 750W', 'Fuente certificada 80 Plus Gold', 110.00),
('Tarjeta Gráfica RTX 3060', 'GPU NVIDIA GeForce RTX 3060 12GB', 450.00),
('Placa Madre ASUS', 'Placa madre para procesadores Intel', 180.00),
('Procesador Ryzen 7', 'Procesador AMD Ryzen 7 5800X', 320.00),
('Cámara Web Logitech', 'Cámara HD 1080p con micrófono', 95.00),
('Router TP-Link', 'Router WiFi 6 de alta velocidad', 140.00),
('Disco Duro 2TB', 'Disco mecánico para almacenamiento masivo', 90.00),
('Tarjeta de Sonido', 'Tarjeta de sonido externa USB', 60.00),
('Micrófono Blue Yeti', 'Micrófono profesional para streaming', 130.00);



select * from producto where id = 3;
