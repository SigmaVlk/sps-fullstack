const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET /api/orders
router.get('/orders', (req, res) => {
    db.all('SELECT * FROM orders', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// POST /api/orders
router.post('/orders', (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    db.run(
        'INSERT INTO orders (name, email, phone) VALUES (?, ?, ?)',
        [name.trim(), email || '', phone || ''],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});
// GET /api/orders/:id
router.get('/orders/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Order not found' });
        res.json(row);
    });
});
// PUT /api/orders/:id
router.put('/orders/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    db.run(
        'UPDATE orders SET name = ?, email = ?, phone = ? WHERE id = ?',
        [name.trim(), email || '', phone || '', id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Order not found' });
            res.json({ message: 'Order updated' });
        }
    );
});
// DELETE /api/orders/:id
router.delete('/orders/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM orders WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order deleted' });
    });
});

module.exports = router;