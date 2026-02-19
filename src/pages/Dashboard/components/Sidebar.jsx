import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import { Home, ChartBar, Wallet, MessageSquare, Trophy, FileText, LayoutDashboard, LogOut, User } from 'lucide-react';
import './sidebar.css';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    // { path: '/dashboard/analytics', label: 'Analytics', icon: ChartBar },
    // { path: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
    { path: '/dashboard/agents', label: 'Agent Team', icon: MessageSquare },
    { path: '/reality-lens', label: 'Reality Lens', icon: Trophy },
    { path: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon-wrapper">
          <div className="logo-dot red"></div>
          <div className="logo-dot yellow"></div>
          <div className="logo-dot green"></div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              title={item.label}
            >
              <Icon size={24} strokeWidth={2} />
              {/* <span className="nav-label">{item.label}</span> */}
            </Link>
          )
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button-icon" title="Logout">
          <LogOut size={24} />
        </button>
      </div>
    </aside>
  );
}
