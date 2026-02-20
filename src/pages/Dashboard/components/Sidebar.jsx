import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import { Home, MessageSquare, Trophy, User, TrendingUp, BrainCircuit, LogOut } from 'lucide-react';
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
    { path: '/dashboard/agents', label: 'Agent Team', icon: MessageSquare },
    { path: '/dashboard/chat', label: 'AI Chat', icon: BrainCircuit },
    { path: '/dashboard/future', label: 'Future Sim', icon: TrendingUp },
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
          // Active if exact match, or for dashboard sub-routes
          const isActive = item.path === '/dashboard'
            ? location.pathname === '/dashboard' || location.pathname === '/dashboard/'
            : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
              title={item.label}
            >
              <Icon size={22} strokeWidth={2} />
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button-icon" title="Logout">
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
}
