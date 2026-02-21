const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// ─── Seed Data ───────────────────────────────────────────────────────────────

const seedUsers = [
  {
    id: 'user-001',
    name: 'David Chen',
    email: 'demo@finsync.ai',
    password: bcrypt.hashSync('password123', 10),
    avatar: 'https://i.pravatar.cc/150?u=david',
    balance: 15480.50,
    cardNumber: '4562 1122 4595 7852',
    cardHolder: 'David Chen',
    goals: [
      { id: 'goal-001', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 4500, deadline: '2025-12-31', category: 'savings' },
      { id: 'goal-002', name: 'New Car', targetAmount: 25000, currentAmount: 8200, deadline: '2026-06-30', category: 'purchase' },
      { id: 'goal-003', name: 'Vacation Fund', targetAmount: 3000, currentAmount: 1800, deadline: '2025-08-15', category: 'travel' },
    ],
    transactions: [
      { id: 'tx-001', name: 'Car Insurance', amount: -350.00, type: 'expense', category: 'insurance', time: '10:42 AM', date: '2025-03-01', status: 'Completed', icon: 'car' },
      { id: 'tx-002', name: 'Salary Deposit', amount: 4500.00, type: 'income', category: 'salary', time: '09:00 AM', date: '2025-03-01', status: 'Completed', icon: 'wallet' },
      { id: 'tx-003', name: 'Online Payment', amount: -154.00, type: 'expense', category: 'shopping', time: '02:15 PM', date: '2025-02-28', status: 'Completed', icon: 'globe' },
      { id: 'tx-004', name: 'Loan EMI', amount: -1200.00, type: 'expense', category: 'loan', time: '12:42 PM', date: '2025-02-28', status: 'Completed', icon: 'bank' },
      { id: 'tx-005', name: 'Freelance Income', amount: 2000.00, type: 'income', category: 'freelance', time: '05:30 PM', date: '2025-02-27', status: 'Completed', icon: 'zap' },
      { id: 'tx-006', name: 'Groceries', amount: -220.50, type: 'expense', category: 'food', time: '11:20 AM', date: '2025-02-26', status: 'Completed', icon: 'shopping' },
    ],
    activities: [
      { id: 'act-001', name: 'Water Bill', amount: -120, status: 'Successfully', type: 'bill', icon: 'droplets' },
      { id: 'act-002', name: 'Income Salary', amount: 4500, status: 'Received', type: 'income', icon: 'wallet' },
      { id: 'act-003', name: 'Electric Bill', amount: -150, status: 'Successfully', type: 'bill', icon: 'zap' },
      { id: 'act-004', name: 'Internet Bill', amount: -60, status: 'Successfully', type: 'bill', icon: 'wifi' },
    ],
    upcomingPayments: [
      { id: 'up-001', name: 'Home Rent', amount: 1500, dueDate: '2025-03-13', status: 'Pending', icon: 'home' },
      { id: 'up-002', name: 'Car Insurance', amount: 350, dueDate: '2025-03-15', status: 'Pending', icon: 'car' },
      { id: 'up-003', name: 'Gym Membership', amount: 49, dueDate: '2025-03-20', status: 'Pending', icon: 'activity' },
    ],
    monthlyExpenses: [
      { name: 'JAN', value: 3000 },
      { name: 'FEB', value: 4500 },
      { name: 'MAR', value: 2500 },
      { name: 'APR', value: 8000 },
      { name: 'MAY', value: 6000 },
      { name: 'JUN', value: 4000 },
      { name: 'JUL', value: 3000 },
      { name: 'AUG', value: 7000 },
      { name: 'SEP', value: 8500 },
      { name: 'OCT', value: 5000 },
      { name: 'NOV', value: 4500 },
    ],
    bills: [
      { id: 'bill-001', title: 'Ready to assign', value: 200, subtext: '- 42', amount: 'Bills in this week: 221', percentage: 42, statusColor: 'blue', category: 'pending' },
      { id: 'bill-002', title: 'Pending sign offs', value: 63, subtext: '- 17', amount: 'Signed off this week: 221', percentage: 22, statusColor: 'grey', category: 'pending' },
      { id: 'bill-003', title: 'Declined', value: 5, amount: 'Declined this week: 2', percentage: -5, statusColor: 'red', category: 'declined' },
      { id: 'bill-004', title: 'RFI', value: 13, subtext: '- 17', amount: 'Requested this week: 2', percentage: 5, statusColor: 'green', category: 'rfi' },
    ],
    invoices: {
      amountOwed: 3412.75,
      paidAmount: 9034.49,
      liveJobsValue: 23708.32,
      invoiceHistory: [
        { month: 'Jan', paid: 4200, pending: 800 },
        { month: 'Feb', paid: 3800, pending: 1200 },
        { month: 'Mar', paid: 5100, pending: 600 },
        { month: 'Apr', paid: 4500, pending: 900 },
        { month: 'May', paid: 6200, pending: 300 },
        { month: 'Jun', paid: 5800, pending: 700 },
      ]
    },
    chatHistory: [],
    createdAt: new Date('2024-01-15').toISOString(),
  }
];

// ─── In-Memory Store ──────────────────────────────────────────────────────────

class DummyDB {
  constructor() {
    this.users = [...seedUsers];
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  findUserById(id) {
    return this.users.find(u => u.id === id) || null;
  }

  createUser({ name, email, password }) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      id: `user-${uuidv4().split('-')[0]}`,
      name,
      email,
      password: hashedPassword,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
      balance: 5000.00,
      cardNumber: `4562 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      cardHolder: name.toUpperCase(),
      goals: [],
      transactions: [
        { id: 'tx-new-001', name: 'Welcome Bonus', amount: 100.00, type: 'income', category: 'bonus', time: '09:00 AM', date: new Date().toISOString().split('T')[0], status: 'Completed', icon: 'wallet' },
      ],
      activities: [
        { id: 'act-new-001', name: 'Account Created', amount: 0, status: 'Successfully', type: 'info', icon: 'user' },
      ],
      upcomingPayments: [],
      monthlyExpenses: [
        { name: 'JAN', value: 0 }, { name: 'FEB', value: 0 }, { name: 'MAR', value: 0 },
        { name: 'APR', value: 0 }, { name: 'MAY', value: 0 }, { name: 'JUN', value: 0 },
        { name: 'JUL', value: 0 }, { name: 'AUG', value: 0 }, { name: 'SEP', value: 0 },
        { name: 'OCT', value: 0 }, { name: 'NOV', value: 0 }, { name: 'DEC', value: 0 },
      ],
      bills: [],
      invoices: { amountOwed: 0, paidAmount: 0, liveJobsValue: 0, invoiceHistory: [] },
      chatHistory: [],
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    this.users[idx] = { ...this.users[idx], ...updates };
    return this.users[idx];
  }

  addGoal(userId, goalData) {
    const user = this.findUserById(userId);
    if (!user) return null;
    const newGoal = { id: `goal-${uuidv4().split('-')[0]}`, ...goalData };
    user.goals.push(newGoal);
    return newGoal;
  }

  updateGoal(userId, goalId, goalData) {
    const user = this.findUserById(userId);
    if (!user) return null;
    const goalIdx = user.goals.findIndex(g => g.id === goalId);
    if (goalIdx === -1) return null;
    user.goals[goalIdx] = { ...user.goals[goalIdx], ...goalData };
    return user.goals[goalIdx];
  }

  deleteGoal(userId, goalId) {
    const user = this.findUserById(userId);
    if (!user) return false;
    const before = user.goals.length;
    user.goals = user.goals.filter(g => g.id !== goalId);
    return user.goals.length < before;
  }

  addChatMessage(userId, message, response, agentType) {
    const user = this.findUserById(userId);
    if (!user) return null;
    const entry = {
      id: `chat-${uuidv4().split('-')[0]}`,
      message,
      response,
      agentType,
      timestamp: new Date().toISOString(),
    };
    user.chatHistory.push(entry);
    // Keep only last 50 messages
    if (user.chatHistory.length > 50) {
      user.chatHistory = user.chatHistory.slice(-50);
    }
    return entry;
  }
}

// Export singleton
const db = new DummyDB();
module.exports = db;
