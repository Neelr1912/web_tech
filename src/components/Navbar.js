import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = [
    'DOL Motor Starters',
    'Star Delta Motor Starters',
    'Oil Immersed Motor Starters',
    'PU Motor Starters',
    'Single Phase Submersible Pump Starters',
    'Three Phase Pump Motor Starters',
    'Control Panels (3 Phase)',
    'Forward & Reverse Switch',
    'Motor Capacitors',
    'Controllers',
    'Overload Relays',
    'Cable Lugs',
    'Motor Starter Spare Parts',
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          AgriLectro Mart
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <span>🔍</span>
          </button>
        </form>

        <div className="navbar-links">
          <div 
            className="categories-dropdown"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="nav-link">Categories ▾</button>
            {showCategories && (
              <div className="dropdown-menu">
                {categories.map((cat, index) => (
                  <Link
                    key={index}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="dropdown-item"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <>
              {user.role === 'customer' && (
                <>
                  <Link to="/wishlist" className="nav-link">
                    <span>❤️</span> Wishlist
                  </Link>
                  <Link to="/cart" className="nav-link cart-link">
                    <span>🛒</span> Cart
                    {getCartCount() > 0 && (
                      <span className="cart-badge">{getCartCount()}</span>
                    )}
                  </Link>
                </>
              )}
              <Link 
                to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} 
                className="nav-link"
              >
                <span>👤</span> {user.name}
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-btn">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
