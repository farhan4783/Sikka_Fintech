const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, addGoal, updateGoal, deleteGoal } = require('../controllers/user');
const { authMiddleware } = require('../middleware/auth');

// All user routes are protected
router.use(authMiddleware);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/goals', addGoal);
router.put('/goals/:goalId', updateGoal);
router.delete('/goals/:goalId', deleteGoal);

module.exports = router;
