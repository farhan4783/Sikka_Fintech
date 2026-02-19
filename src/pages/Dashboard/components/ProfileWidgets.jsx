import { Calendar, DollarSign, Briefcase, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const BillCard = ({ title, value, subtext, icon: Icon, percentage, statusColor, amount }) => (
    <div className={`bill-card ${statusColor}`}>
        <div className="bill-card-header">
            <div className="bill-icon-wrapper">
                <Icon size={20} />
            </div>
            <div className="bill-percentage-circle">
                <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <span className="percentage-text">{percentage > 0 ? '+' : ''}{percentage}%</span>
            </div>
        </div>
        <div className="bill-card-content">
            <p className="bill-title">{title}</p>
            <h3 className="bill-value">{value} <span className="bill-subvalue">{subtext ? `${subtext}` : ''}</span></h3>
            {amount && <p className="bill-footer-text">{amount}</p>}
        </div>
        <div className={`bill-status-indicator ${statusColor}`}></div>
    </div>
);

export const AmountOwedCard = () => (
    <div className="amount-owed-card">
        <div className="dots-menu">⋮</div>
        <div className="gauge-container">
            <div className="semi-circle-gauge">
                <div className="gauge-fill" style={{ transform: 'rotate(135deg)' }}></div> {/* ~45% */}
                <div className="gauge-cover">
                    <span className="gauge-percentage">45%</span>
                </div>
            </div>
            <div className="gauge-icon">
                <FileText size={20} color="white" />
            </div>
        </div>
        <div className="owed-content">
            <p className="owed-label">Amount Owed</p>
            <h2 className="owed-amount">$933,879.45</h2>
            <p className="owed-sub">$126,783.89</p>
        </div>
    </div>
);

export const InvoiceStatCard = ({ title, amount, subtext, icon: Icon, percentage, color }) => (
    <div className="invoice-stat-card">
        <div className="stat-card-header">
            <div className="stat-icon-wrapper">
                <Icon size={20} />
            </div>
            <div className="stat-percentage-circle">
                <span className="percentage-text-small">{percentage > 0 ? '+' : ''}{percentage}%</span>
            </div>
        </div>
        <div className="stat-card-content">
            <p className="stat-title">{title}</p>
            <h3 className="stat-amount">{amount}</h3>
            <p className="stat-sub">{subtext}</p>
        </div>
        <div className={`stat-indicator ${color}`}></div>
    </div>
);


const data = [
    { name: 'Feb', value: 4000 },
    { name: 'Mar', value: 6000, active: true },
    { name: 'Apr', value: 3000 },
    { name: 'May', value: 7000 },
    { name: 'Jun', value: 5000 },
    { name: 'Jul', value: 4500 },
    { name: 'Aug', value: 6000 },
    { name: 'Sep', value: 8000 },
];

export const ProfileChart = () => (
    <div className="profile-chart-card">
        <div className="chart-header">
            <span className="chart-badge">Mar 2021</span>
            <div className="dots-menu">⋮</div>
        </div>
        <div className="chart-area" style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barSize={24}>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#a0aec0', fontSize: 12 }}
                        dy={10}
                    />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.active ? '#6b46c1' : '#e2e8f0'} fillOpacity={1} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);
