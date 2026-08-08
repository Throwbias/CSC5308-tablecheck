-- Clear existing data
TRUNCATE TABLE assignments, restaurant_tables, users RESTART IDENTITY CASCADE;

-- Insert 3 Users
INSERT INTO users (name, role, email) VALUES 
('Alice Johnson', 'Server', 'alice@tablelogic.com'),
('Bob Smith', 'Server', 'bob@tablelogic.com'),
('Carol Davis', 'Manager', 'carol@tablelogic.com');

-- Insert 3 Tables (varying capacities and statuses)
INSERT INTO restaurant_tables (table_number, capacity, is_occupied) VALUES 
(12, 4, TRUE),
(14, 2, FALSE),
(21, 6, TRUE);

-- Insert 3 Assignments (Mapping servers to tables)
INSERT INTO assignments (user_id, table_id) VALUES 
(1, 1), -- Alice assigned to Table 12
(1, 2), -- Alice assigned to Table 14
(2, 3); -- Bob assigned to Table 21