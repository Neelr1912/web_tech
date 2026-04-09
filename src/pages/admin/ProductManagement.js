import React, { useState } from 'react';
import { products } from '../../data/products';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Product Management</h1>
        <p className="dashboard-subtitle">Manage your product catalog</p>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ maxWidth: '400px', marginBottom: '0' }}
          />
          <button className="btn btn-primary">Add New Product</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price.toLocaleString()}</td>
                <td>{product.stock}</td>
                <td>{product.rating} ⭐</td>
                <td>
                  <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }}>
                    Edit
                  </button>
                  <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px', color: 'var(--error)', borderColor: 'var(--error)' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
