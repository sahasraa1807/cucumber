import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, product.sizes[0] || '', product.colors[0] || '');
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div style={styles.card} onClick={() => navigate(`/products/${product._id}`)}>
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.name} style={styles.image} />
        {product.stock === 0 && <div style={styles.outOfStock}>Out of Stock</div>}
      </div>

      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.category}>{product.category}</p>
        
        <div style={styles.priceRow}>
          <span style={styles.price}>₹{product.price}</span>
          {product.rating > 0 && (
            <span style={styles.rating}>⭐ {product.rating.toFixed(1)}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart} 
          className="btn btn-primary" 
          style={styles.button}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '120%',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  outOfStock: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: '600'
  },
  content: {
    padding: '16px'
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  category: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '12px'
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#10b981'
  },
  rating: {
    fontSize: '14px',
    color: '#f59e0b'
  },
  button: {
    width: '100%',
    fontSize: '14px'
  }
};

export default ProductCard;
