import React from 'react';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';

const WishlistPage = () => {
  const { wishlist } = useCart();

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">My Wishlist</h1>
        <p className="dashboard-subtitle">{wishlist.length} items</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="dashboard-section" style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>Your wishlist is empty</p>
          <a href="/products" className="btn btn-primary">Browse Products</a>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
