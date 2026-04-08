import React, { useState } from 'react';
import { products } from '../../data/products';
import { useInventory } from '../../context/InventoryContext';
import '../../styles/InventoryManagement.css';

const InventoryManagement = () => {
  const { getStock, increaseStock, decreaseStock, setStock } = useInventory();
  const [addAmounts, setAddAmounts] = useState({});
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const lowStock = products.filter(p => getStock(p.id) < 20);

  const handleAdd = (productId) => {
    const amt = parseInt(addAmounts[productId]) || 0;
    if (amt <= 0) return;
    increaseStock(productId, amt);
    setAddAmounts(prev => ({ ...prev, [productId]: '' }));
  };

  const handleDecrease = (productId) => {
    const amt = parseInt(addAmounts[productId]) || 0;
    if (amt <= 0) return;
    decreaseStock(productId, amt);
    setAddAmounts(prev => ({ ...prev, [productId]: '' }));
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Inventory Management</h1>
        <p className="dashboard-subtitle">Monitor and adjust stock levels</p>
      </div>

      {lowStock.length > 0 && (
        <div className="low-stock-alert">
          <span>⚠️</span>
          <span>{lowStock.length} product(s) have low stock (below 20 units)</span>
        </div>
      )}

      <div className="dashboard-section">
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '360px' }}
          />
        </div>

        <div className="inv-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Qty to Add / Remove</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const stock = getStock(product.id);
                const isLow = stock < 20;
                return (
                  <tr key={product.id} className={isLow ? 'row-low' : ''}>
                    <td>{product.name}</td>
                    <td style={{ fontSize: '13px', color: 'var(--text-light)' }}>{product.category}</td>
                    <td>
                      <span className={`stock-badge ${isLow ? 'stock-low' : 'stock-ok'}`}>
                        {stock} units
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={addAmounts[product.id] || ''}
                        onChange={e => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          setAddAmounts(prev => ({ ...prev, [product.id]: val || '' }));
                        }}
                        placeholder="Enter qty"
                        className="qty-input"
                      />
                    </td>
                    <td>
                      <div className="inv-actions">
                        <button
                          className="inv-btn inv-btn-add"
                          onClick={() => handleAdd(product.id)}
                          title="Add Stock (Company Order)"
                        >
                          + Add Stock
                        </button>
                        <button
                          className="inv-btn inv-btn-remove"
                          onClick={() => handleDecrease(product.id)}
                          title="Remove Stock"
                          disabled={stock === 0}
                        >
                          − Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;
