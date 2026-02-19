import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CreditCard as CardIcon, Send, Building2, Globe, Droplets, Wallet, Zap, Wifi, Home, Car, User } from 'lucide-react';

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

export const CreditCard = () => (
    <div className="credit-card-widget">
        <div className="card-chip"></div>
        <div className="card-number">4562 1122 4595 7852</div>
        <div className="card-footer">
            <div className="card-holder">
                <span>CARD HOLDER</span>
                <strong>Ghulam</strong>
            </div>
            <div className="card-logo">
                <div className="mastercard-circle red"></div>
                <div className="mastercard-circle orange"></div>
            </div>
        </div>
    </div>
);

export const BalanceSection = () => (
    <div className="balance-section">
        <div>
            <p className="balance-label">Balance</p>
            <h2 className="balance-amount">$1500</h2>
        </div>
        <span className="past-30-days">PAST 30 DAYS</span>
    </div>
)


const data = [
    { name: 'JAN', value: 3000 },
    { name: 'FEB', value: 4500 },
    { name: 'MAR', value: 2500, active: true },
    { name: 'APR', value: 8000 },
    { name: 'MAY', value: 6000 },
    { name: 'JUN', value: 4000 },
    { name: 'JUL', value: 3000 },
    { name: 'AUG', value: 7000 },
    { name: 'SEP', value: 8500 },
    { name: 'OCT', value: 5000 },
    { name: 'NOV', value: 4500 },
];

export const ExpenseChart = () => {
    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} barSize={20}>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#a0aec0', fontSize: 10 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#a0aec0', fontSize: 10 }}
                        tickFormatter={(value) => `${value / 1000}K`}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="custom-tooltip">
                                        <p className="tooltip-label">{`Expense`}</p>
                                        <p className="tooltip-value">{`$${payload[0].value}`}</p>
                                        <div className="tooltip-arrow"></div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.active ? '#1a1f3a' : '#1a1f3a'} fillOpacity={entry.name === 'MAR' ? 1 : (index % 2 === 0 ? 0.8 : 0.4)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export const HistoryList = () => (
    <div className="history-section">
        <h3>History</h3>
        <p className="history-subtitle">Transaction of last 6 months</p>
        <div className="history-list">
            <div className="history-item">
                <div className="history-user">
                    <img src="https://i.pravatar.cc/150?u=1" alt="User" />
                    <span>Car Insurance</span>
                </div>
                <div className="history-time" data-label="Time">10:42:23 AM</div>
                <div className="history-amount" data-label="Amount">$350.00</div>
                <div className="history-status" data-label="Status">Completed</div>
            </div>
            <div className="history-item">
                <div className="history-user">
                    <img src="https://i.pravatar.cc/150?u=2" alt="User" />
                    <span>Loan</span>
                </div>
                <div className="history-time" data-label="Time">12:42:00 PM</div>
                <div className="history-amount" data-label="Amount">$1200.00</div>
                <div className="history-status" data-label="Status">Completed</div>
            </div>
            <div className="history-item">
                <div className="history-user">
                    <img src="https://i.pravatar.cc/150?u=3" alt="User" />
                    <span>Online Payment</span>
                </div>
                <div className="history-time" data-label="Time">10:42:23 AM</div>
                <div className="history-amount" data-label="Amount">$154.00</div>
                <div className="history-status" data-label="Status">Completed</div>
            </div>
        </div>
    </div>
);

export const RightPanel = () => (
    <div className="right-panel">
        <div className="recent-activities">
            <h3>Recent Activities</h3>
            <p className="date-label">02 Mar 2021</p>
            <div className="activity-list">
                <div className="activity-item">
                    <div className="activity-icon"><Droplets size={18} /></div>
                    <div className="activity-details">
                        <h4>Water Bill</h4>
                        <p>Successfully</p>
                    </div>
                    <span className="activity-amount">$120</span>
                </div>
                <div className="activity-item">
                    <div className="activity-icon"><Wallet size={18} /></div>
                    <div className="activity-details">
                        <h4>Income Salary</h4>
                        <p>Received</p>
                    </div>
                    <span className="activity-amount">$4500</span>
                </div>
                <div className="activity-item">
                    <div className="activity-icon"><Zap size={18} /></div>
                    <div className="activity-details">
                        <h4>Electric Bill</h4>
                        <p>Successfully</p>
                    </div>
                    <span className="activity-amount">$150</span>
                </div>
                <div className="activity-item">
                    <div className="activity-icon"><Wifi size={18} /></div>
                    <div className="activity-details">
                        <h4>Internet Bill</h4>
                        <p>Successfully</p>
                    </div>
                    <span className="activity-amount">$60</span>
                </div>
            </div>
        </div>

        <div className="upcoming-payments">
            <h3>Upcoming Payments</h3>
            <p className="date-label">13 Mar 2021</p>
            <div className="activity-list">
                <div className="activity-item">
                    <div className="activity-icon"><Home size={18} /></div>
                    <div className="activity-details">
                        <h4>Home Rent</h4>
                        <p>Pending</p>
                    </div>
                    <span className="activity-amount">$1500</span>
                </div>
                <div className="activity-item">
                    <div className="activity-icon"><Car size={18} /></div>
                    <div className="activity-details">
                        <h4>Car Insurance</h4>
                        <p>Pending</p>
                    </div>
                    <span className="activity-amount">$150</span>
                </div>
            </div>
        </div>
    </div>
);
