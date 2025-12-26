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
    { path: '/admin/history', label: 'History of Farmers Form', icon: '📋' }
  ];

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
          <h2>JIOJI GREEN INDIA</h2>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <div className="top-bar">
          <h1 className="page-title">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
          </h1>
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{fontWeight: 500}}>{user?.name || 'User'}</div>
              <div style={{fontSize: '12px', color: '#666'}}>ID: {user?.id || '00000000'}</div>
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