const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get All Skills
router.get('/skills', (req, res) => {
    db.query('SELECT * FROM skills', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add Skill
router.post('/skills', (req, res) => {
    const { user_id, skill_name, category } = req.body;

    db.query(
        'INSERT INTO skills (user_id, skill_name, category) VALUES (?, ?, ?)',
        [user_id, skill_name, category],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Skill added successfully' });
        }
    );
});

// Delete Skill
router.delete('/skills/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM skills WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Skill deleted successfully' });
    });
});

module.exports = router;
