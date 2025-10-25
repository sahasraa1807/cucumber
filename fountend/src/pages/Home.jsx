import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await axios.get('/api/products?featured=true');
      setFeaturedProducts(data.slice(0, 8));
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'Clothing', icon: '👗', color: '#fce7f3' },
    { name: 'Accessories', icon: '👜', color: '#ddd6fe' },
    { name: 'Footwear', icon: '👠', color: '#fef3c7' },
    { name: 'Beauty', icon: '💄', color: '#fce7f3' },
    { name: 'Jewelry', icon: '💍', color: '#dbeafe' },
    { name: 'Bags', icon: '👛', color: '#d1fae5' }
  ];

  return (
    <div>
      <section style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to Cucumber 🥒</h1>
          <p style={styles.heroSubtitle}>Discover the latest in women's fashion</p>
          <button onClick={() => navigate('/products')} className="btn btn-primary" style={styles.heroButton}>
            Shop Now
          </button>
        </div>
      </section>

      <section style={styles.categories}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Shop by Category</h2>
          <div className="grid grid-cols-3" style={styles.categoryGrid}>
            {categories.map((category) => (
              <div 
                key={category.name} 
                style={{...styles.categoryCard, backgroundColor: category.color}}
                onClick={() => navigate(`/products?category=${category.name}`)}
              >
                <span style={styles.categoryIcon}>{category.icon}</span>
                <h3 style={styles.categoryName}>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.featured}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p style={styles.noProducts}>No featured products available</p>
          )}
        </div>
      </section>

      <section style={styles.features}>
        <div className="container">
          <div className="grid grid-cols-3">
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🚚</span>
              <h3 style={styles.featureTitle}>Free Shipping</h3>
              <p style={styles.featureText}>On orders above ₹999</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>↩️</span>
              <h3 style={styles.featureTitle}>Easy Returns</h3>
              <p style={styles.featureText}>7-day return policy</p>
            </div>
            <div style={styles.featureCard}>
              <span style={styles.featureIcon}>🔒</span>
              <h3 style={styles.featureTitle}>Secure Payment</h3>
              <p style={styles.featureText}>100% secure transactions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#ffffff',
    padding: '80px 20px',
    textAlign: 'center'
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '16px'
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '32px',
    opacity: 0.9
  },
  heroButton: {
    padding: '14px 32px',
    fontSize: '16px'
  },
  categories: {
    padding: '60px 20px',
    backgroundColor: '#ffffff'
  },
  sectionTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40px',
    color: '#111827'
  },
  categoryGrid: {
    gap: '20px'
  },
  categoryCard: {
    padding: '40px 20px',
    borderRadius: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  categoryIcon: {
    fontSize: '48px',
    marginBottom: '12px',
    display: 'block'
  },
  categoryName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827'
  },
  featured: {
    padding: '60px 20px',
    backgroundColor: '#f9fafb'
  },
  noProducts: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '40px'
  },
  features: {
    padding: '60px 20px',
    backgroundColor: '#ffffff'
  },
  featureCard: {
    textAlign: 'center',
    padding: '20px'
  },
  featureIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    display: 'block'
  },
  featureTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  featureText: {
    fontSize: '14px',
    color: '#6b7280'
  }
};

export default Home;
