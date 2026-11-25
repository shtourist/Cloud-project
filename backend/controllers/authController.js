const pool = require('../config/database');

exports.signup = async (req, res) => {
    const { name, pass, admin } = req.body || {};
    if (typeof name !== 'string' || !name.trim() || typeof pass !== 'string' || !pass) {
        return res.status(400).json({ message: 'Name and password are required' });
    }
    if (admin === true && process.env.NODE_ENV === 'production') {
        return res.status(403).json({ message: 'Administrator self-signup is disabled in production' });
    }

    try {
        const query = `
            INSERT INTO users (name, admin, password)
            VALUES ($1, $2, $3)
            RETURNING name, admin
        `;
        const result = await pool.query(query, [
            name.trim(),
            process.env.NODE_ENV !== 'production' && admin === true,
            pass
        ]);
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: 'An account with that name already exists' });
        }
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    const { name, pass } = req.body || {};
    if (typeof name !== 'string' || !name.trim() || typeof pass !== 'string' || !pass) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    try {
        const query = 'SELECT name, password, admin FROM users WHERE name = $1';
        const result = await pool.query(query, [name.trim()]);
        const user = result.rows[0];

        if (!user || user.password !== pass) {
            return res.status(401).json({ message: 'Invalid name or password' });
        }

        return res.status(200).json({
            message: 'Login successful',
            admin: user.admin === true
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
