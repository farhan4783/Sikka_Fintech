import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import { ActionCard, BalanceSection, ExpenseChart, HistoryList, RightPanel, CreditCard } from '../components/DashboardWidgets';
import { CreditCard as CardIcon, Send, Building2, Globe } from 'lucide-react';
import { getToken } from '../utils/api';
import './dashboard.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Dashboard() {
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${API_BASE}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) setDashData(json.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const transfers = dashData?.recentTransfers || [
    { title: 'Transfer via', subtitle: 'Card number', amount: 1200 },
    { title: 'Transfer', subtitle: 'Other Banks', amount: 150 },
    { title: 'Transfer', subtitle: 'Same Bank', amount: 1500 },
    { title: 'Transfer to', subtitle: 'Other Bank', amount: 1500 },
  ];
  const icons = [CardIcon, Send, Building2, Globe];

  return (
    <>
      <Topbar title="Dashboard" subtitle="Payments updates" />

      {loading ? (
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your financial data...</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          <div className="main-section">
            <div className="action-cards-grid">
              {transfers.map((transfer, i) => (
                <ActionCard
                  key={i}
                  title={transfer.title}
                  subtitle={transfer.subtitle}
                  amount={transfer.amount}
                  icon={icons[i] || CardIcon}
                />
              ))}
            </div>

            <div className="balance-grid">
              <BalanceSection balance={dashData?.balance} />
              <div className="chart-wrapper">
                <ExpenseChart data={dashData?.monthlyExpenses} />
              </div>
            </div>

            <HistoryList transactions={dashData?.transactions} />
          </div>

          <div className="right-section-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <CreditCard cardNumber={dashData?.cardNumber} cardHolder={dashData?.cardHolder} />
              <RightPanel activities={dashData?.activities} upcomingPayments={dashData?.upcomingPayments} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
