import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/farmers', label: 'Farmer Info', icon: '👨‍🌾' },
    { path: '/admin/employees', label: 'Employee Management', icon: '👥' },
    { path: '/admin/products', label: 'Product & Category', icon: '📦' },
    { path: '/admin/orders', label: 'Order Tracking', icon: '🛒' },
    { path: '/admin/lab-reports', label: 'Lab Report', icon: '🔬' },
    { path: '/admin/history', label: 'Survey History', icon: '📋' }
  ];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
          <span style={{ fontWeight: 700, fontSize: '18px' }}>JIOJI GREEN</span>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <i style={{ fontStyle: 'normal', marginRight: '12px', fontSize: '20px' }}>{item.icon}</i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 'auto', padding: '20px 0' }}>
          <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-dark)' }}>
            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="user-info">
            <div className="user-avatar">
              {(user?.firstName || user?.email || 'A').charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : (user?.email || 'Admin')}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {user?.userId || user?.employeeId || 'ADM-001'}</div>
            </div>
          </div>
        </div>

        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};


export default AdminLayout;