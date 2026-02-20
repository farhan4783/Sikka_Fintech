import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Agents from '../Agents/Agents';
import Profile from './pages/Profile';
import FutureSimulator from './pages/FutureSimulator';
import AgentChat from './pages/AgentChat';
import './Dashboard.css';

function DashboardLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="agents" element={<Agents />} />
          <Route path="profile" element={<Profile />} />
          <Route path="future" element={<FutureSimulator />} />
          <Route path="chat" element={<AgentChat />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
