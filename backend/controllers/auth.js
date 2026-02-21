const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/dummyDb');
const { JWT_SECRET } = require('../middleware/auth');

// Sanitize user object (remove password)
const sanitizeUser = (user) => {
    const { password, chatHistory, ...safe } = user;
    return safe;
};

// POST /api/auth/signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
        }

        const existing = db.findUserByEmail(email);
        if (existing) {
            return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
        }

        const user = db.createUser({ name, email, password });
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        return res.status(201).json({
            success: true,
            message: 'Account created successfully!',
            data: {
                token,
                user: sanitizeUser(user),
            },
        });
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const user = db.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

        return res.json({
            success: true,
            message: 'Login successful!',
            data: {
                token,
                user: sanitizeUser(user),
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
};

// GET /api/auth/me
const getMe = (req, res) => {
    return res.json({
        success: true,
        data: { user: sanitizeUser(req.user) },
    });
};

module.exports = { signup, login, getMe };
