import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import '../styles/HomePage.css';

const HomePage = () => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AgriLectro Mart</h1>
          <p>Your trusted source for agricultural electronic products</p>
          <Link to="/products" className="btn btn-primary hero-btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="category-icon">⚡</div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-outline">
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery across India</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Quality Products</h3>
              <p>Certified and tested electrical components</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing on all products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Warranty</h3>
              <p>Manufacturer warranty on all items</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
