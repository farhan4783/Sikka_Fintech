const jwt = require('jsonwebtoken');
const db = require('../db/dummyDb');

const JWT_SECRET = process.env.JWT_SECRET || 'finsync_secret_key_2025';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided. Please log in.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = db.findUserById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
    }
};

module.exports = { authMiddleware, JWT_SECRET };
