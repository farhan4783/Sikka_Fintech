import { useState, useEffect } from 'react';
import Topbar from '../components/Topbar';
import { BillCard, AmountOwedCard, InvoiceStatCard, ProfileChart } from '../components/ProfileWidgets';
import { Calendar, FileText, XCircle, Clock, Wallet, Radio } from 'lucide-react';
import { getToken } from '../utils/api';
import './profile.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const res = await fetch(`${API_BASE}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (json.success) setProfile(json.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const billIcons = [Calendar, FileText, XCircle, Clock];
  const bills = profile?.bills || [
    { id: 1, title: 'Ready to assign', value: 200, subtext: '- 42', amount: 'Bills in this week 221', percentage: 42, statusColor: 'blue' },
    { id: 2, title: 'Pending sign offs', value: 63, subtext: '- 17', amount: 'Signed off in this week 221', percentage: 22, statusColor: 'grey' },
    { id: 3, title: 'Declined', value: 5, amount: 'Declined this week 2', percentage: -5, statusColor: 'red' },
    { id: 4, title: 'RFI', value: 13, subtext: '- 17', amount: 'Requested this week 2', percentage: 5, statusColor: 'green' },
  ];

  const invoices = profile?.invoices || { paidAmount: 9034.49, liveJobsValue: 23708.32 };
  const userName = profile?.name || 'User';
  const greeting = `Good Morning, ${userName.split(' ')[0]}`;

  const historyItem = profile?.transactions?.[0];

  return (
    <div className="profile-page">
      <Topbar title={loading ? 'Your Profile' : greeting} subtitle="Your weekly Financial update" />

      {loading ? (
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      ) : (
        <>
          <div className="profile-section">
            <h3 className="section-title">Bills</h3>
            <div className="bills-grid">
              {bills.map((bill, i) => (
                <BillCard
                  key={bill.id || i}
                  title={bill.title}
                  value={bill.value}
                  subtext={bill.subtext}
                  amount={bill.amount}
                  icon={billIcons[i] || Calendar}
                  percentage={bill.percentage}
                  statusColor={bill.statusColor}
                />
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">Invoices</h3>
            <div className="invoices-grid">
              <div className="invoices-col">
                <AmountOwedCard amount={invoices.amountOwed} />
              </div>
              <div className="invoices-col middle">
                <InvoiceStatCard
                  title="Paid Invoices"
                  amount={`$${(invoices.paidAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  subtext="Current Financial Year"
                  icon={Wallet}
                  percentage={-5}
                />
                <InvoiceStatCard
                  title="Live Jobs Value"
                  amount={`$${(invoices.liveJobsValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  subtext="Current Financial Year"
                  icon={Radio}
                  percentage={85}
                  color="purple"
                />
              </div>
              <div className="invoices-col chart-col">
                <ProfileChart data={invoices.invoiceHistory} />
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3 className="section-title">History</h3>
            {historyItem ? (
              <div className="profile-history-bar">
                <div className="ph-user">
                  <img src={profile?.avatar || `https://i.pravatar.cc/150?u=${profile?.email}`} alt="User" />
                  <span>{userName.split(' ')[0]}</span>
                </div>
                <span data-label="Time">{historyItem.time}</span>
                <span data-label="Amount">${Math.abs(historyItem.amount).toFixed(2)}</span>
                <span data-label="Type">{historyItem.type || 'Transaction'}</span>
                <span data-label="Method">Balance</span>
                <span data-label="Category">{historyItem.category || 'General'}</span>
                <span className="ph-status" data-label="Status">{historyItem.status}</span>
              </div>
            ) : (
              <div className="profile-history-bar">
                <span style={{ color: 'var(--text-tertiary)' }}>No transaction history yet.</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
