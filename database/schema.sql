-- Tabulka náhradních dílů
CREATE TABLE IF NOT EXISTS parts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  part_number TEXT NOT NULL
);

-- Tabulka dodavatelů
CREATE TABLE IF NOT EXISTS suppliers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  contact TEXT
);

-- M:N vztah – objednávky dílů od dodavatelů
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  part_id INTEGER NOT NULL,
  supplier_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  FOREIGN KEY (part_id) REFERENCES parts(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);