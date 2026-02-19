import Topbar from '../components/Topbar';
import { BillCard, AmountOwedCard, InvoiceStatCard, ProfileChart } from '../components/ProfileWidgets';
import { Calendar, FileText, XCircle, Clock, Wallet, Radio } from 'lucide-react';
import './profile.css';

export default function Profile() {
  return (
    <div className="profile-page">
      <Topbar title="Good Morning David" subtitle="Your weekly Financial update" />

      <div className="profile-section">
        <h3 className="section-title">Bills</h3>
        <div className="bills-grid">
          <BillCard
            title="Ready to assign"
            value="200"
            subtext="- 42"
            amount="Bills in this week 221"
            icon={Calendar}
            percentage={42}
            statusColor="blue"
          />
          <BillCard
            title="Pending sign offs"
            value="63"
            subtext="- 17"
            amount="Signed off in this week 221"
            icon={FileText}
            percentage={22}
            statusColor="grey"
          />
          <BillCard
            title="Declined"
            value="5"
            amount="Declined this week 2"
            icon={XCircle}
            percentage={-5}
            statusColor="red"
          />
          <BillCard
            title="RFI"
            value="13"
            subtext="- 17"
            amount="Requested this week 2"
            icon={Clock}
            percentage={5}
            statusColor="green"
          />
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">Invoices</h3>
        <div className="invoices-grid">
          <div className="invoices-col">
            <AmountOwedCard />
          </div>
          <div className="invoices-col middle">
            <InvoiceStatCard
              title="Paid Invoices"
              amount="$9,034.49"
              subtext="Current Financial Year"
              icon={Wallet}
              percentage={-5}
            />
            <InvoiceStatCard
              title="Live Jobs Value"
              amount="$23,708.32"
              subtext="Current Financial Year"
              icon={Radio}
              percentage={85}
              color="purple"
            />
          </div>
          <div className="invoices-col chart-col">
            <ProfileChart />
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="section-title">History</h3>
        <div className="profile-history-bar">
          <div className="ph-user">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
            <span>Loon</span>
          </div>
          <span data-label="Time">12:42:00 PM</span>
          <span data-label="Amount">$1200.00</span>
          <span data-label="Type">Installments</span>
          <span data-label="Method">Balance</span>
          <span data-label="Category">History</span>
          <span className="ph-status" data-label="Status">Completed</span>
        </div>
      </div>

    </div>
  );
}
