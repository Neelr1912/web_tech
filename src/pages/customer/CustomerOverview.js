import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerOverview = () => {
  const { user } = useAuth();
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const recentOrders = orders.slice(-3).reverse();

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user.name}!</h1>
        <p className="dashboard-subtitle">Manage your orders and account</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{orders.filter(o => o.status === 'Processing').length}</h3>
            <p>Processing</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{orders.filter(o => o.status === 'Delivered').length}</h3>
            <p>Delivered</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Orders</h2>
          <Link to="/customer/orders" className="btn btn-outline">View All</Link>
        </div>
        {recentOrders.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>{order.items.length} items</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td><span className="status-badge">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
            No orders yet. <Link to="/products">Start shopping!</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerOverview;
