import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
import RealityLens from './pages/RealityLens/RealityLens'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="/reality-lens" element={<RealityLens />} />
    </Routes>
  )
}

export default App
