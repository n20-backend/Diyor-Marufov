-- ENUMS
CREATE TYPE currency_type AS ENUM ('USD', 'EUR', 'UZS');
CREATE TYPE user_role AS ENUM ('customer', 'seller', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE payment_method AS ENUM ('credit_card', 'paypal', 'bank_transfer');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE review_status AS ENUM ('approved', 'pending', 'rejected');

-- PRODUCT TABLE
CREATE TABLE product (
    productId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    categoryId UUID REFERENCES category(categoryId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    price DECIMAL(10,2) NOT NULL,
    currency currency_type NOT NULL,
    stockQuantity INT NOT NULL CHECK (stockQuantity >= 0),
    imageUrl VARCHAR NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- CATEGORY TABLE
CREATE TABLE category (
    categoryId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USER TABLE
CREATE TABLE users (
    userId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role user_role NOT NULL,
    status user_status NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER TABLE
CREATE TABLE orders (
    orderId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES users(userId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    totalAmount DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER DETAIL TABLE
CREATE TABLE orderDetail (
    orderDetailId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orderId UUID REFERENCES orders(orderId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    productId UUID REFERENCES product(productId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    quantity INT NOT NULL,
    unitPrice DECIMAL(10,2) NOT NULL,
    totalPrice DECIMAL(10,2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PAYMENT TABLE
CREATE TABLE payment (
    paymentId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    orderId UUID REFERENCES orders(orderId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    method payment_method NOT NULL,
    status payment_status NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REVIEW TABLE
CREATE TABLE review (
    reviewId UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    productId UUID REFERENCES product(productId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    userId UUID REFERENCES users(userId) 
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 10),
    comment TEXT NOT NULL,
    status review_status NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
