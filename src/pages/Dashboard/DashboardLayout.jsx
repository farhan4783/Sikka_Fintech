import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Agents from '../Agents/Agents';
import Profile from './pages/Profile';

function DashboardLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
