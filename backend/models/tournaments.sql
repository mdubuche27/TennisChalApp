CREATE TABLE IF NOT EXISTS tournaments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);
