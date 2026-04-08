import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const { isAuthenticated } = useAuth();
  const { getStock } = useInventory();
  const navigate = useNavigate();

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const stock = getStock(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/login'); return; }
    if (stock === 0) return;
    addToCart(product);
    alert('Product added to cart!');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/login'); return; }
    if (stock === 0) return;
    addToCart(product);
    navigate('/checkout');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isAuthenticated) { navigate('/login'); return; }
    addToWishlist(product);
    alert('Added to wishlist!');
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.discount > 0 && (
          <span className="discount-badge">{product.discount}% OFF</span>
        )}
        <button
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlist}
        >
          ❤️
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        {product.hp && <p className="product-hp">⚡ {product.hp}</p>}

        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-text">({product.reviews})</span>
        </div>

        <div className="product-price-block">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="product-original-price">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {stock > 0 ? (
          <div className="product-actions">
            <button className="btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn-buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        ) : (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
