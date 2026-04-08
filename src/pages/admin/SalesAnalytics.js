import React from 'react';
import { products } from '../../data/products';

const SalesAnalytics = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');

  // Today's date string for comparison
  const todayStr = new Date().toDateString();

  const todayOrders = orders.filter(o => new Date(o.orderDate).toDateString() === todayStr);
  const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Build product-level sales map
  const productSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (productSales[item.id]) {
        productSales[item.id].quantity += item.quantity;
        productSales[item.id].revenue += item.price * item.quantity;
      } else {
        productSales[item.id] = {
          name: item.name,
          quantity: item.quantity,
          revenue: item.price * item.quantity,
        };
      }
    });
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Sales Analytics</h1>
        <p className="dashboard-subtitle">Track your sales performance</p>
      </div>

      {/* Today's stats */}
      <p style={{ fontWeight: '600', color: 'var(--text-light)', marginBottom: '12px', fontSize: '14px' }}>
        TODAY — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="stats-grid" style={{ marginBottom: '16px' }}>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>₹{todaySales.toLocaleString('en-IN')}</h3>
            <p>Today's Sales</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{todayOrders.length}</h3>
            <p>Today's Orders</p>
          </div>
        </div>
      </div>

      {/* Overall stats */}
      <p style={{ fontWeight: '600', color: 'var(--text-light)', marginBottom: '12px', fontSize: '14px' }}>
        OVERALL
      </p>
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{totalRevenue.toLocaleString('en-IN')}</h3>
            <p>Total Sales</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>₹{avgOrderValue.toLocaleString('en-IN')}</h3>
            <p>Avg Order Value</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
      </div>

      {/* Top selling products */}
      <div className="dashboard-section">
        <h2 className="section-title">Top Selling Products</h2>
        {topProducts.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product Name</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>
                    <span style={{
                      fontWeight: '700',
                      color: index === 0 ? '#FFB300' : index === 1 ? '#9E9E9E' : index === 2 ? '#8D6E63' : 'var(--text-dark)'
                    }}>
                      #{index + 1}
                    </span>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td style={{ fontWeight: '600', color: 'var(--primary-green)' }}>
                    ₹{product.revenue.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
            No sales data yet. Orders will appear here once customers purchase.
          </p>
        )}
      </div>

      {/* Recent orders list */}
      {orders.length > 0 && (
        <div className="dashboard-section">
          <h2 className="section-title">Recent Orders</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].reverse().slice(0, 10).map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName || order.shippingAddress?.fullName || '—'}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString('en-IN')}</td>
                  <td>{order.items.length}</td>
                  <td style={{ fontWeight: '600' }}>₹{order.total.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesAnalytics;
