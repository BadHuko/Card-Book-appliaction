CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  addnum VARCHAR(255) DEFAULT NULL,
  personal_phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  note TEXT
);

CREATE TABLE IF NOT EXISTS company (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_address VARCHAR(255) NOT NULL,
  company_phone VARCHAR(20) NOT NULL,
  company_inn VARCHAR(20) NOT NULL,
  company_website VARCHAR(255) NOT NULL,
  company_email VARCHAR(255) NOT NULL,
  company_note TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);