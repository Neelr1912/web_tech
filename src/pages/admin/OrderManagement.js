import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders') || '[]').reverse());

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders.reverse()));
    alert('Order status updated!');
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Order Management</h1>
        <p className="dashboard-subtitle">Manage customer orders</p>
      </div>

      <div className="dashboard-section">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <div>{order.shippingAddress.fullName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                      {order.shippingAddress.email}
                    </div>
                  </td>
                  <td>{order.items.length}</td>
                  <td>₹{order.total.toLocaleString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ padding: '6px', fontSize: '13px' }}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)' }}>
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
