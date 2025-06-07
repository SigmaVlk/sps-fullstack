INSERT INTO parts (name, part_number) VALUES
('Brzdové destičky', 'BP123'),
('Olejový filtr', 'OF456');

INSERT INTO suppliers (name, contact) VALUES
('AutoParts s.r.o.', 'kontakt@autoparts.cz'),
('ServisTech a.s.', 'info@servistech.cz');

INSERT INTO orders (part_id, supplier_id, order_date) VALUES
(1, 1, '2025-06-01'),
(2, 2, '2025-06-02');
