import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getTotalItems, toggleCart, isCartOpen } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav style={styles.navbar}>
        <div className="container" style={styles.navContent}>
          <Link to="/" style={styles.logo}>
            <img 
              src="/logo.png" 
              alt="Cucumber Logo" 
              style={styles.logoImage}
            />
            <span style={styles.logoText}>Cucumber</span>
          </Link>

          <div style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/products" style={styles.navLink}>Products</Link>
          </div>

          <div style={styles.navActions}>
            <button onClick={toggleCart} style={styles.cartButton}>
              🛒 Cart ({getTotalItems()})
            </button>

            {user ? (
              <>
                <Link to="/orders" style={styles.navLink}>Orders</Link>
                <span style={styles.userName}>{user.name}</span>
                <button onClick={handleLogout} className="btn btn-secondary" style={styles.authButton}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline" style={styles.authButton}>Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary" style={styles.authButton}>Register</button>
                </Link>
              </>
            )}
          </div>

          <button style={styles.mobileMenuButton} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <Link to="/" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Products</Link>
            {user && <Link to="/orders" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>Orders</Link>}
          </div>
        )}
      </nav>

      {isCartOpen && <Cart />}
    </>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    gap: '20px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none'
  },
  logoImage: {
    width: '45px',
    height: '45px',
    objectFit: 'contain',
    borderRadius: '8px'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#10b981',
    letterSpacing: '0.5px'
  },
  navLinks: {
    display: 'flex',
    gap: '24px',
    flex: 1,
    marginLeft: '40px'
  },
  navLink: {
    color: '#374151',
    fontWeight: 500,
    transition: 'color 0.3s ease',
    padding: '8px 12px',
    textDecoration: 'none'
  },
  navActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  cartButton: {
    backgroundColor: '#f3f4f6',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  userName: {
    color: '#6b7280',
    fontSize: '14px'
  },
  authButton: {
    fontSize: '14px'
  },
  mobileMenuButton: {
    display: 'none',
    fontSize: '24px',
    background: 'none',
    border: 'none',
    color: '#374151',
    cursor: 'pointer'
  },
  mobileMenu: {
    display: 'none',
    flexDirection: 'column',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb'
  },
  mobileLink: {
    padding: '12px',
    color: '#374151',
    fontWeight: 500,
    textDecoration: 'none'
  }
};

export default Navbar;
