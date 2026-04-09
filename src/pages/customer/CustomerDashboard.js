import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CustomerOverview from './CustomerOverview';
import OrdersPage from './OrdersPage';
import WishlistPage from './WishlistPage';
import ProfilePage from './ProfilePage';
import '../../styles/Dashboard.css';

const CustomerDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/customer/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/customer/orders', label: 'My Orders', icon: '📦' },
    { path: '/customer/wishlist', label: 'Wishlist', icon: '❤️' },
    { path: '/customer/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Customer Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="dashboard-content">
        <Routes>
          <Route path="dashboard" element={<CustomerOverview />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  );
};

export default CustomerDashboard;
