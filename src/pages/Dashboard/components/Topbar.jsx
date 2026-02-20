import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../ThemeContext';
import '../pages/dashboard.css';

export default function Topbar({ title, subtitle }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="search-bar">
        <Search size={16} color="var(--text-tertiary)" />
        <input type="text" placeholder="Search..." />
      </div>

      <div className="header-actions">
        {/* Theme Toggle */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>

        <div
          className="user-profile-wrapper"
          onClick={() => navigate('/dashboard/profile')}
          title="Profile"
        >
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User"
            className="user-profile-pic"
          />
          <ChevronDown size={14} color="var(--text-tertiary)" />
        </div>
      </div>
    </header>
  );
}
