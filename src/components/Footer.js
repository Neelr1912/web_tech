import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>AgriLectro Mart is your trusted source for agricultural electronic products, motor starters, and electrical components.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <Link to="/help">Help Center</Link>
          <Link to="/support">Support</Link>
          <Link to="/orders">Track Order</Link>
          <Link to="/returns">Returns & Refunds</Link>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 Email: support@agrilectro.com</p>
          <p>📞 Phone: +91 1234567890</p>
          <p>📍 Address: Agricultural Electronics Hub, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 AgriLectro Mart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
