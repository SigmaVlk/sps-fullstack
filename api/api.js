const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Get all items
router.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create a new item
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Item created' });
    }
  );
});

module.exports = router;
// Get a specific item
router.get('/items/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Item not found' });
    res.json(row);
  });
});
// Update an item
router.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  db.run(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    [name, description, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Item updated' });
    }
  );
});
// Delete an item
router.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item deleted' });
  });
});