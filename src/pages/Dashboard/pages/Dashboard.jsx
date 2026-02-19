import Topbar from '../components/Topbar';
import { ActionCard, BalanceSection, ExpenseChart, HistoryList, RightPanel, CreditCard } from '../components/DashboardWidgets';
import { CreditCard as CardIcon, Send, Building2, Globe } from 'lucide-react';
import './dashboard.css';

export default function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Payments updates" />

      <div className="dashboard-grid">
        <div className="main-section">

          <div className="action-cards-grid">
            <ActionCard
              title="Transfer via"
              subtitle="Card number"
              amount="1200"
              icon={CardIcon}
            />
            <ActionCard
              title="Transfer"
              subtitle="Other Banks"
              amount="150"
              icon={Send}
            />
            <ActionCard
              title="Transfer"
              subtitle="Same Bank"
              amount="1500"
              icon={Building2}
            />
            <ActionCard
              title="Transfer to"
              subtitle="Other Bank"
              amount="1500"
              icon={Globe}
            />
          </div>

          <div className="balance-grid">
            <BalanceSection />
            <div className="chart-wrapper">
              <ExpenseChart />
            </div>
          </div>

          <HistoryList />
        </div>

        <div className="right-section-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <CreditCard />
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  );
}
