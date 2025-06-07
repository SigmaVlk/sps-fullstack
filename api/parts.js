const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Get all parts
router.get('/', (req, res) => {
  db.all('SELECT * FROM parts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get one part
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM parts WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Part not found' });
    res.json(row);
  });
});

// Create a new part
router.post('/', (req, res) => {
  const { name, part_number } = req.body;
  db.run(
    'INSERT INTO parts (name, part_number) VALUES (?, ?)',
    [name, part_number],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update a part
router.put('/:id', (req, res) => {
  const { name, part_number } = req.body;
  db.run(
    'UPDATE parts SET name = ?, part_number = ? WHERE id = ?',
    [name, part_number, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Part updated' });
    }
  );
});

// Delete a part
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM parts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Part deleted' });
  });
});

module.exports = router;
