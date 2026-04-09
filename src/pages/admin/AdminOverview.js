import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const AdminOverview = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const processingOrders = orders.filter(o => o.status === 'Processing').length;

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Overview</h1>
        <p className="dashboard-subtitle">Welcome to Admin Panel</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{processingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link to="/admin/products" className="btn btn-primary">Manage Products</Link>
          <Link to="/admin/orders" className="btn btn-primary">View Orders</Link>
          <Link to="/admin/inventory" className="btn btn-primary">Check Inventory</Link>
          <Link to="/admin/analytics" className="btn btn-primary">Sales Analytics</Link>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Orders</h2>
          <Link to="/admin/orders" className="btn btn-outline">View All</Link>
        </div>
        {orders.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-5).reverse().map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.shippingAddress.fullName}</td>
                  <td>{order.items.length}</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td><span className="status-badge">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>No orders yet</p>
        )}
      </div>
    </div>
  );
};

export default AdminOverview;
