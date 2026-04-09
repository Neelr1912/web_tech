import React from 'react';
import { generateInvoice } from '../../utils/invoiceGenerator';

const statusColor = {
  Processing: '#FF9800',
  Shipped: '#2196F3',
  Delivered: '#4CAF50',
  Cancelled: '#F44336',
};

const OrdersPage = () => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]').reverse();

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Orders</h1>
        <p className="dashboard-subtitle">Track and manage your orders</p>
      </div>

      <div className="dashboard-section">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} style={{
              marginBottom: '24px',
              border: '1px solid var(--gray)',
              borderRadius: '10px',
              overflow: 'hidden',
            }}>
              {/* Order header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                backgroundColor: 'var(--light-gray)',
                flexWrap: 'wrap',
                gap: '12px',
              }}>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '16px' }}>Order #{order.id}</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '13px', marginTop: '2px' }}>
                    {new Date(order.orderDate).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    padding: '5px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: statusColor[order.status] + '22',
                    color: statusColor[order.status] || 'var(--text-dark)',
                  }}>
                    {order.status}
                  </span>
                  <button
                    onClick={() => generateInvoice(order)}
                    style={{
                      padding: '7px 16px',
                      backgroundColor: 'var(--primary-green)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    ⬇ Download Invoice
                  </button>
                </div>
              </div>

              {/* Items */}
              <div style={{ padding: '0 20px' }}>
                {order.items.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px 0',
                    borderBottom: '1px solid var(--gray)',
                    alignItems: 'center',
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '500' }}>{item.name}</p>
                      <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>
                        Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <p style={{ fontWeight: '600', color: 'var(--primary-green)' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={{
                padding: '14px 20px',
                textAlign: 'right',
                borderTop: '2px solid var(--gray)',
              }}>
                <p style={{ fontSize: '18px', fontWeight: '700' }}>
                  Total: ₹{order.total.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)' }}>
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
