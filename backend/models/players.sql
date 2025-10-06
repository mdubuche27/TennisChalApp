CREATE TABLE IF NOT EXISTS players (
  id          SERIAL PRIMARY KEY,
  first_name  VARCHAR(50) NOT NULL,
  last_name   VARCHAR(50) NOT NULL,
  nationality TEXT NOT NULL,
  ranking     INT,
  -- clé unique composite pour éviter les doublons exacts
  UNIQUE (first_name, last_name)
);