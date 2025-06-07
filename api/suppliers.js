const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Get all suppliers
router.get('/', (req, res) => {
  db.all('SELECT * FROM suppliers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get one supplier
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM suppliers WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Supplier not found' });
    res.json(row);
  });
});

// Create a new supplier
router.post('/', (req, res) => {
  const { name, contact } = req.body;
  db.run(
    'INSERT INTO suppliers (name, contact) VALUES (?, ?)',
    [name, contact],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update a supplier
router.put('/:id', (req, res) => {
  const { name, contact } = req.body;
  db.run(
    'UPDATE suppliers SET name = ?, contact = ? WHERE id = ?',
    [name, contact, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Supplier updated' });
    }
  );
});

// Delete a supplier
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM suppliers WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Supplier deleted' });
  });
});

module.exports = router;
