import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import AdminOverview from './AdminOverview';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import InventoryManagement from './InventoryManagement';
import SalesAnalytics from './SalesAnalytics';
import '../../styles/Dashboard.css';

const AdminDashboard = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' },
    { path: '/admin/inventory', label: 'Inventory', icon: '📋' },
    { path: '/admin/analytics', label: 'Sales Analytics', icon: '📈' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
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
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="analytics" element={<SalesAnalytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
