import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { products } from '../data/products';
import '../styles/ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const { getStock } = useInventory();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));
  const stock = product ? getStock(product.id) : 0;

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToWishlist(product);
    alert('Added to wishlist!');
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-category-text">{product.category}</p>

            <div className="product-rating-section">
              <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
              <span className="rating-value">{product.rating}</span>
              <span className="reviews-count">({product.reviews} reviews)</span>
            </div>

            <div className="product-price-section">
              <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="discount-tag">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.features && (
              <div className="product-features">
                <h3>Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.suitableFor && (
              <div className="product-suitable">
                <h3>Suitable For</h3>
                <div className="suitable-tags">
                  {product.suitableFor.map((item, index) => (
                    <span key={index} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="product-stock">
              {stock > 0 ? (
                <span className="in-stock">In Stock ({stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            {stock > 0 && (
              <>
                <div className="quantity-selector">
                  <label>Quantity:</label>
                  <div className="quantity-controls">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={() => setQuantity(Math.min(stock, quantity + 1))}>+</button>
                  </div>
                </div>

                <div className="product-actions-section">
                  <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button className="btn btn-secondary" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                  <button className="btn btn-outline" onClick={handleWishlist}>
                    ❤️ Wishlist
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
