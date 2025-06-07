const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET /api/parts - list všech dílů
router.get('/parts', (req, res) => {
    db.all('SELECT * FROM parts', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// POST /api/parts - vytvořit nový díl
router.post('/parts', (req, res) => {
    const { name, description } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    db.run(
        'INSERT INTO parts (name, description) VALUES (?, ?)',
        [name.trim(), description || ''],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});
// GET /api/parts/:id - detail dílu
router.get('/parts/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM parts WHERE id = ?', [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Part not found' });
        res.json(row);
    });
});
// PUT /api/parts/:id - aktualizace dílu
router.put('/parts/:id', (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Name is required and must be a string' });
    }
    db.run(
        'UPDATE parts SET name = ?, description = ? WHERE id = ?',
        [name.trim(), description || '', id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Part not found' });
            res.json({ message: 'Part updated' });
        }
    );
});
// DELETE /api/parts/:id - smazání dílu
router.delete('/parts/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM parts WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Part not found' });
        res.json({ message: 'Part deleted' });
    });
});

module.exports = router;
