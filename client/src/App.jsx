import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [token, setToken] = useState(
    () => sessionStorage.getItem('scoops_admin_token') || ''
  );

  function handleLogin(t) {
    sessionStorage.setItem('scoops_admin_token', t);
    setToken(t);
  }

  function handleLogout() {
    sessionStorage.removeItem('scoops_admin_token');
    setToken('');
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
          <Route
            path="/admin/dashboard"
            element={
              token ? (
                <AdminDashboard token={token} onLogout={handleLogout} />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
