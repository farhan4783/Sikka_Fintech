import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CreditCard as CardIcon, Send, Building2, Globe, Droplets, Wallet, Zap, Wifi, Home, Car, User } from 'lucide-react';

// ─── Action Card ─────────────────────────────────────────────────────────────
export const ActionCard = ({ title, amount, icon: Icon, subtitle }) => (
    <div className="action-card">
        <div className="action-card-header">
            <div className="action-icon-wrapper">
                <Icon size={24} />
            </div>
            <button className="action-menu-dots">⋮</button>
        </div>
        <div className="action-card-content">
            <p className="action-title">{title}</p>
            {subtitle && <p className="action-subtitle">{subtitle}</p>}
            <h3 className="action-amount">${amount}</h3>
        </div>
    </div>
);

// ─── Credit Card ─────────────────────────────────────────────────────────────
export const CreditCard = ({ cardNumber, cardHolder }) => (
    <div className="credit-card-widget">
        <div className="card-chip"></div>
        <div className="card-number">{cardNumber || '4562 1122 4595 7852'}</div>
        <div className="card-footer">
            <div className="card-holder">
                <span>CARD HOLDER</span>
                <strong>{cardHolder || 'Account Holder'}</strong>
            </div>
            <div className="card-logo">
                <div className="mastercard-circle red"></div>
                <div className="mastercard-circle orange"></div>
            </div>
        </div>
    </div>
);

// ─── Balance Section ──────────────────────────────────────────────────────────
export const BalanceSection = ({ balance }) => (
    <div className="balance-section">
        <div>
            <p className="balance-label">Balance</p>
            <h2 className="balance-amount">
                ${balance !== undefined ? balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '1,500.00'}
            </h2>
        </div>
        <span className="past-30-days">PAST 30 DAYS</span>
    </div>
);

// ─── Expense Chart ────────────────────────────────────────────────────────────
const defaultChartData = [
    { name: 'JAN', value: 3000 }, { name: 'FEB', value: 4500 },
    { name: 'MAR', value: 2500 }, { name: 'APR', value: 8000 },
    { name: 'MAY', value: 6000 }, { name: 'JUN', value: 4000 },
    { name: 'JUL', value: 3000 }, { name: 'AUG', value: 7000 },
    { name: 'SEP', value: 8500 }, { name: 'OCT', value: 5000 },
    { name: 'NOV', value: 4500 },
];

export const ExpenseChart = ({ data }) => {
    const chartData = data || defaultChartData;
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} barSize={20}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a0aec0', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a0aec0', fontSize: 10 }} tickFormatter={(v) => `${v / 1000}K`} />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="custom-tooltip">
                                        <p className="tooltip-label">Expense</p>
                                        <p className="tooltip-value">${payload[0].value}</p>
                                        <div className="tooltip-arrow"></div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="var(--chart-bar)" fillOpacity={index === 2 ? 1 : (index % 2 === 0 ? 0.65 : 0.35)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// ─── Transaction Icon Map ────────────────────────────────────────────────────
const txIcons = {
    car: '🚗', wallet: '💰', globe: '🌐', bank: '🏦', zap: '⚡', shopping: '🛍️', default: '💳',
};

// ─── History List ─────────────────────────────────────────────────────────────
export const HistoryList = ({ transactions }) => {
    const items = transactions || [
        { id: 1, name: 'Car Insurance', amount: -350.00, time: '10:42 AM', status: 'Completed', icon: 'car' },
        { id: 2, name: 'Loan', amount: -1200.00, time: '12:42 PM', status: 'Completed', icon: 'bank' },
        { id: 3, name: 'Online Payment', amount: -154.00, time: '10:42 AM', status: 'Completed', icon: 'globe' },
    ];

    return (
        <div className="history-section">
            <h3>History</h3>
            <p className="history-subtitle">Transaction of last 6 months</p>
            <div className="history-list">
                {items.map((tx, i) => (
                    <div className="history-item" key={tx.id || i}>
                        <div className="history-user">
                            <span style={{ fontSize: '20px' }}>{txIcons[tx.icon] || txIcons.default}</span>
                            <span>{tx.name}</span>
                        </div>
                        <div className="history-time" data-label="Time">{tx.time}</div>
                        <div className="history-amount" data-label="Amount" style={{ color: tx.amount >= 0 ? 'var(--color-success)' : 'inherit' }}>
                            {tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                        </div>
                        <div className="history-status" data-label="Status">{tx.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Activity Icon Map ────────────────────────────────────────────────────────
const activityIconMap = {
    droplets: <Droplets size={18} />, wallet: <Wallet size={18} />, zap: <Zap size={18} />,
    wifi: <Wifi size={18} />, home: <Home size={18} />, car: <Car size={18} />, user: <User size={18} />,
};

// ─── Right Panel ──────────────────────────────────────────────────────────────
export const RightPanel = ({ activities, upcomingPayments }) => {
    const recentActivities = activities || [
        { id: 1, name: 'Water Bill', amount: -120, status: 'Successfully', icon: 'droplets' },
        { id: 2, name: 'Income Salary', amount: 4500, status: 'Received', icon: 'wallet' },
        { id: 3, name: 'Electric Bill', amount: -150, status: 'Successfully', icon: 'zap' },
        { id: 4, name: 'Internet Bill', amount: -60, status: 'Successfully', icon: 'wifi' },
    ];

    const upcoming = upcomingPayments || [
        { id: 1, name: 'Home Rent', amount: 1500, status: 'Pending', icon: 'home' },
        { id: 2, name: 'Car Insurance', amount: 150, status: 'Pending', icon: 'car' },
    ];

    return (
        <div className="right-panel">
            <div className="recent-activities">
                <h3>Recent Activities</h3>
                <p className="date-label">{new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <div className="activity-list">
                    {recentActivities.map((act, i) => (
                        <div className="activity-item" key={act.id || i}>
                            <div className="activity-icon">{activityIconMap[act.icon] || <Wallet size={18} />}</div>
                            <div className="activity-details">
                                <h4>{act.name}</h4>
                                <p>{act.status}</p>
                            </div>
                            <span className="activity-amount" style={{ color: act.amount >= 0 ? 'var(--color-success)' : 'inherit' }}>
                                {act.amount >= 0 ? '+' : ''}${Math.abs(act.amount)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="upcoming-payments">
                <h3>Upcoming Payments</h3>
                <p className="date-label">Due soon</p>
                <div className="activity-list">
                    {upcoming.map((pay, i) => (
                        <div className="activity-item" key={pay.id || i}>
                            <div className="activity-icon">{activityIconMap[pay.icon] || <Home size={18} />}</div>
                            <div className="activity-details">
                                <h4>{pay.name}</h4>
                                <p>{pay.status}</p>
                            </div>
                            <span className="activity-amount">${pay.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
