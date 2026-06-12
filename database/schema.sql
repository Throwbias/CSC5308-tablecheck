-- Drop the tables if they already exist so you can easily reset
DROP TABLE IF EXISTS restaurant_tables CASCADE;
DROP TABLE IF EXISTS staff_users CASCADE;

-- Create the core MVP table for physical restaurant layout
CREATE TABLE restaurant_tables (
    id SERIAL PRIMARY KEY,               
    table_name VARCHAR(10) UNIQUE NOT NULL, 
    capacity INTEGER NOT NULL,           
    is_occupied BOOLEAN DEFAULT FALSE,   
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Authentication Foundation Table (Prepped for future sprints)
CREATE TABLE staff_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Storing cryptographically secure bcrypt hashes later
    role VARCHAR(50) DEFAULT 'staff',    -- Ready for role-based permission controls
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);