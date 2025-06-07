const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Získat všechny ajtemy
router.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Získat specifický ajtem
router.get('/items/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Item not found' });
    res.json(row);
  });
});

// Vytvořit nový ajtem
router.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }

  db.run(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name.trim(), description || ''],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Item created', id: this.lastID });
    }
  );
});

// aktualizovat ajtem
router.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }

  db.run(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    [name.trim(), description || '', id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
      res.json({ message: 'Item updated' });
    }
  );
});

// Smazat ajtem
router.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  });
});

module.exports = router;
