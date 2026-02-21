const db = require('../db/dummyDb');

// Sanitize user object (remove password + chatHistory for smaller response)
const sanitizeUser = (user) => {
    const { password, chatHistory, ...safe } = user;
    return safe;
};

// GET /api/user/profile
const getProfile = (req, res) => {
    return res.json({
        success: true,
        data: sanitizeUser(req.user),
    });
};

// PUT /api/user/profile
const updateProfile = (req, res) => {
    const { name, email, avatar } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (avatar) updates.avatar = avatar;

    const updated = db.updateUser(req.user.id, updates);
    if (!updated) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({
        success: true,
        message: 'Profile updated successfully.',
        data: sanitizeUser(updated),
    });
};

// POST /api/user/goals
const addGoal = (req, res) => {
    const { name, targetAmount, currentAmount, deadline, category } = req.body;

    if (!name || !targetAmount) {
        return res.status(400).json({ success: false, message: 'Goal name and target amount are required.' });
    }

    const goal = db.addGoal(req.user.id, {
        name,
        targetAmount: parseFloat(targetAmount),
        currentAmount: parseFloat(currentAmount) || 0,
        deadline: deadline || null,
        category: category || 'savings',
    });

    return res.status(201).json({
        success: true,
        message: 'Goal added successfully.',
        data: goal,
    });
};

// PUT /api/user/goals/:goalId
const updateGoal = (req, res) => {
    const { goalId } = req.params;
    const { name, targetAmount, currentAmount, deadline, category } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (targetAmount !== undefined) updates.targetAmount = parseFloat(targetAmount);
    if (currentAmount !== undefined) updates.currentAmount = parseFloat(currentAmount);
    if (deadline !== undefined) updates.deadline = deadline;
    if (category !== undefined) updates.category = category;

    const updated = db.updateGoal(req.user.id, goalId, updates);
    if (!updated) {
        return res.status(404).json({ success: false, message: 'Goal not found.' });
    }

    return res.json({
        success: true,
        message: 'Goal updated successfully.',
        data: updated,
    });
};

// DELETE /api/user/goals/:goalId
const deleteGoal = (req, res) => {
    const { goalId } = req.params;
    const deleted = db.deleteGoal(req.user.id, goalId);

    if (!deleted) {
        return res.status(404).json({ success: false, message: 'Goal not found.' });
    }

    return res.json({
        success: true,
        message: 'Goal deleted successfully.',
    });
};

module.exports = { getProfile, updateProfile, addGoal, updateGoal, deleteGoal };
