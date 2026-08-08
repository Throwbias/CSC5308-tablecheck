CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    table_id INT NOT NULL,
    assigned_date DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_table FOREIGN KEY(table_id) REFERENCES restaurant_tables(id) ON DELETE CASCADE
);