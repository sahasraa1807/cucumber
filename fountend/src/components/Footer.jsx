import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.content}>
        <div style={styles.section}>
          <h3 style={styles.heading}>🥒 Cucumber</h3>
          <p style={styles.text}>Your one-stop destination for women's fashion</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.subheading}>Quick Links</h4>
          <div style={styles.links}>
            <a href="/products" style={styles.link}>Shop</a>
            <a href="/about" style={styles.link}>About Us</a>
            <a href="/contact" style={styles.link}>Contact</a>
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.subheading}>Categories</h4>
          <div style={styles.links}>
            <a href="/products?category=Clothing" style={styles.link}>Clothing</a>
            <a href="/products?category=Accessories" style={styles.link}>Accessories</a>
            <a href="/products?category=Footwear" style={styles.link}>Footwear</a>
            <a href="/products?category=Beauty" style={styles.link}>Beauty</a>
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.subheading}>Connect With Us</h4>
          <div style={styles.social}>
            <span style={styles.socialIcon}>📘</span>
            <span style={styles.socialIcon}>📷</span>
            <span style={styles.socialIcon}>🐦</span>
          </div>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.copyright}>© 2025 Cucumber. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
    marginTop: '60px'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    padding: '40px 20px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: '8px'
  },
  subheading: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  text: {
    fontSize: '14px',
    color: '#d1d5db',
    lineHeight: '1.6'
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  link: {
    color: '#d1d5db',
    fontSize: '14px',
    transition: 'color 0.3s ease'
  },
  social: {
    display: 'flex',
    gap: '16px'
  },
  socialIcon: {
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  },
  bottom: {
    borderTop: '1px solid #374151',
    padding: '20px',
    textAlign: 'center'
  },
  copyright: {
    fontSize: '14px',
    color: '#9ca3af'
  }
};

export default Footer;
