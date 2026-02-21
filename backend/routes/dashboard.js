const express = require('express');
const router = express.Router();
const { getDashboard } = require('../controllers/dashboard');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getDashboard);

module.exports = router;
