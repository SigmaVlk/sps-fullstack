const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Get all orders with part and supplier details
router.get('/', (req, res) => {
  const query = `
    SELECT 
      orders.id,
      orders.order_date,
      parts.name AS part_name,
      parts.part_number,
      suppliers.name AS supplier_name,
      suppliers.contact
    FROM orders
    JOIN parts ON orders.part_id = parts.id
    JOIN suppliers ON orders.supplier_id = suppliers.id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get one order by ID
router.get('/:id', (req, res) => {
  const query = `
    SELECT 
      orders.id,
      orders.order_date,
      parts.name AS part_name,
      suppliers.name AS supplier_name
    FROM orders
    JOIN parts ON orders.part_id = parts.id
    JOIN suppliers ON orders.supplier_id = suppliers.id
    WHERE orders.id = ?
  `;
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Order not found' });
    res.json(row);
  });
});

// Create new order
router.post('/', (req, res) => {
  const { part_id, supplier_id, order_date } = req.body;
  db.run(
    'INSERT INTO orders (part_id, supplier_id, order_date) VALUES (?, ?, ?)',
    [part_id, supplier_id, order_date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update an order
router.put('/:id', (req, res) => {
  const { part_id, supplier_id, order_date } = req.body;
  db.run(
    'UPDATE orders SET part_id = ?, supplier_id = ?, order_date = ? WHERE id = ?',
    [part_id, supplier_id, order_date, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Order updated' });
    }
  );
});

// Delete an order
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM orders WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order deleted' });
  });
});

module.exports = router;
