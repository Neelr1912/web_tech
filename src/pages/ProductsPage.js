import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories, hpOptions } from '../data/products';
import '../styles/ProductsPage.css';

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,500', min: 500, max: 1500 },
  { label: '₹1,500 – ₹3,000', min: 1500, max: 3000 },
  { label: '₹3,000 – ₹5,000', min: 3000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: Infinity },
];

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedHp, setSelectedHp] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Sync category from URL param
  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    if (cat) setSelectedCategory(cat);
    if (q) {
      // search mode — handled in filter effect
    }
  }, [searchParams]);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    const range = PRICE_RANGES[selectedPriceRange];
    let result = [...products];

    if (q) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase())
      );
    }
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedHp) result = result.filter(p => p.hp === selectedHp);
    result = result.filter(p => p.price >= range.min && p.price <= range.max);

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'discount') result.sort((a, b) => b.discount - a.discount);

    setFilteredProducts(result);
  }, [selectedCategory, selectedHp, selectedPriceRange, sortBy, searchParams]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedHp('');
    setSelectedPriceRange(0);
    setSortBy('');
  };

  const hasFilters = selectedCategory || selectedHp || selectedPriceRange !== 0 || sortBy;

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1 className="page-title">
            {selectedCategory || (searchParams.get('q') ? `Results for "${searchParams.get('q')}"` : 'All Products')}
          </h1>
          <p className="products-count">Showing {filteredProducts.length} products</p>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filter-header">
              <h3>Filters</h3>
              {hasFilters && (
                <button className="clear-filters-btn" onClick={clearFilters}>Clear All</button>
              )}
            </div>

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">HP Rating</label>
              <select
                value={selectedHp}
                onChange={e => setSelectedHp(e.target.value)}
                className="filter-select"
              >
                <option value="">All HP</option>
                {hpOptions.map(hp => (
                  <option key={hp} value={hp}>{hp}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              {PRICE_RANGES.map((range, i) => (
                <label key={i} className="radio-option">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === i}
                    onChange={() => setSelectedPriceRange(i)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <label className="filter-label">Sort By</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Best Rating</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="products-main">
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products match your filters.</p>
                <button className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
