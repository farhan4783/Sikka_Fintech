// GET /api/dashboard
const getDashboard = (req, res) => {
    const user = req.user;

    return res.json({
        success: true,
        data: {
            // Balance & Card Info
            balance: user.balance,
            cardNumber: user.cardNumber,
            cardHolder: user.cardHolder,
            userName: user.name,
            avatar: user.avatar,

            // Action card amounts (last 4 recent transactions)
            recentTransfers: [
                { title: 'Transfer via', subtitle: 'Card number', amount: 1200 },
                { title: 'Transfer', subtitle: 'Other Banks', amount: 150 },
                { title: 'Transfer', subtitle: 'Same Bank', amount: 1500 },
                { title: 'Transfer to', subtitle: 'Other Bank', amount: 1500 },
            ],

            // Chart data
            monthlyExpenses: user.monthlyExpenses,

            // Transaction history (last 6)
            transactions: user.transactions.slice(-6).reverse(),

            // Right panel — recent activities
            activities: user.activities,

            // Right panel — upcoming payments
            upcomingPayments: user.upcomingPayments,

            // Goals summary
            goals: user.goals,

            // Stats
            totalGoals: user.goals.length,
            goalsCompleted: user.goals.filter(g => g.currentAmount >= g.targetAmount).length,
        },
    });
};

module.exports = { getDashboard };
