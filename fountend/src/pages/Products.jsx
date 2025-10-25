import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || ''
  });

  const categories = ['All', 'Clothing', 'Accessories', 'Footwear', 'Beauty', 'Jewelry', 'Bags'];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.category && filters.category !== 'All') params.category = filters.category;
      if (filters.search) params.search = filters.search;

      const { data } = await axios.get('/api/products', { params });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    const newCategory = category === 'All' ? '' : category;
    setFilters({ ...filters, category: newCategory });
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title}>All Products</h1>

        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />

          <div style={styles.categories}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  ...styles.categoryButton,
                  ...(filters.category === category || (category === 'All' && !filters.category)
                    ? styles.categoryButtonActive
                    : {})
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p style={styles.noProducts}>No products found</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    minHeight: '60vh'
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '32px',
    color: '#111827'
  },
  filters: {
    marginBottom: '40px'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  categories: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px'
  },
  categoryButton: {
    padding: '8px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  categoryButtonActive: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    borderColor: '#10b981'
  },
  noProducts: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '60px 20px',
    fontSize: '18px'
  }
};

export default Products;
