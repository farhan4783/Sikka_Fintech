import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Bell, ChevronDown } from 'lucide-react';
import '../pages/dashboard.css';

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate();

  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="search-bar">
        <Search size={18} color="#a0aec0" />
        <input type="text" placeholder="Search" />
      </div>

      <div className="header-actions">
        <button className="icon-btn">
          <Calendar size={24} />
        </button>
        <button className="icon-btn">
          <Bell size={24} />
          <span className="notification-badge"></span>
        </button>
        <div className="user-profile-wrapper" onClick={() => navigate('/profile')}>
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="user-profile-pic" />
          <ChevronDown size={16} color="#a0aec0" style={{ marginLeft: 8 }} />
        </div>
      </div>
    </header>
  );
}
