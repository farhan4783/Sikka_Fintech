const express = require('express');
const router = express.Router();
const { sendMessage, getHistory, analyzeStock, analyzeSpending } = require('../controllers/chat');
const { authMiddleware } = require('../middleware/auth');

// All chat routes are protected
router.use(authMiddleware);

router.post('/', sendMessage);
router.get('/history', getHistory);
router.post('/stock-analysis', analyzeStock);
router.post('/spending-analysis', analyzeSpending);

module.exports = router;
