const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET /api/suppliers 
router.get('/suppliers', (req, res) => {
    db.all('SELECT * FROM suppliers', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// POST /api/suppliers
router.post('/suppliers', (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    db.run(
        'INSERT INTO suppliers (name, email, phone) VALUES (?, ?, ?)',
        [name.trim(), email || '', phone || ''],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});
// GET /api/suppliers/:id
router.get('/suppliers/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM suppliers WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Supplier not found' });
        res.json(row);
    });
});
// PUT /api/suppliers/:id
router.put('/suppliers/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    db.run(
        'UPDATE suppliers SET name = ?, email = ?, phone = ? WHERE id = ?',
        [name.trim(), email || '', phone || '', id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Supplier not found' });
            res.json({ message: 'Supplier updated' });
        }
    );
});
// DELETE /api/suppliers/:id 
router.delete('/suppliers/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM suppliers WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Supplier not found' });
        res.json({ message: 'Supplier deleted' });
    });
});

module.exports = router;