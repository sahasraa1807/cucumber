import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import API_URL from '../config';


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/products/${id}`);

      setProduct(data);
      if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return null;

  return (
    <div style={styles.container}>
      <div className="container">
        <button onClick={() => navigate('/products')} style={styles.backButton}>
          ← Back to Products
        </button>

        <div style={styles.content}>
          <div style={styles.imageSection}>
            <img src={product.image} alt={product.name} style={styles.image} />
          </div>

          <div style={styles.infoSection}>
            <h1 style={styles.name}>{product.name}</h1>
            <p style={styles.category}>{product.category}</p>
            
            {product.rating > 0 && (
              <div style={styles.rating}>
                ⭐ {product.rating.toFixed(1)} ({product.numReviews} reviews)
              </div>
            )}

            <div style={styles.price}>₹{product.price}</div>

            <p style={styles.description}>{product.description}</p>

            {product.sizes && product.sizes.length > 0 && (
              <div style={styles.option}>
                <label style={styles.label}>Size:</label>
                <div style={styles.sizeButtons}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        ...styles.sizeButton,
                        ...(selectedSize === size ? styles.sizeButtonActive : {})
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div style={styles.option}>
                <label style={styles.label}>Color:</label>
                <div style={styles.colorButtons}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        ...styles.colorButton,
                        ...(selectedColor === color ? styles.colorButtonActive : {})
                      }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={styles.option}>
              <label style={styles.label}>Quantity:</label>
              <div style={styles.quantityControl}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={styles.quantityButton}
                >
                  -
                </button>
                <span style={styles.quantityText}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>
            </div>

            <div style={styles.stock}>
              {product.stock > 0 ? (
                <span style={styles.inStock}>✓ In Stock ({product.stock} available)</span>
              ) : (
                <span style={styles.outOfStock}>✗ Out of Stock</span>
              )}
            </div>

            <div style={styles.actions}>
              <button 
                onClick={handleAddToCart} 
                className="btn btn-primary" 
                style={styles.addButton}
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
              <button 
                onClick={() => navigate('/products')} 
                className="btn btn-secondary"
                style={styles.continueButton}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    minHeight: '60vh'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#10b981',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '24px',
    cursor: 'pointer'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px'
  },
  imageSection: {
    position: 'sticky',
    top: '100px',
    height: 'fit-content'
  },
  image: {
    width: '100%',
    borderRadius: '12px',
    objectFit: 'cover'
  },
  infoSection: {
    paddingTop: '20px'
  },
  name: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px'
  },
  category: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '16px'
  },
  rating: {
    fontSize: '14px',
    color: '#f59e0b',
    marginBottom: '16px'
  },
  price: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: '24px'
  },
  description: {
    fontSize: '16px',
    color: '#374151',
    lineHeight: '1.6',
    marginBottom: '32px'
  },
  option: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px'
  },
  sizeButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  sizeButton: {
    padding: '8px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  sizeButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    color: '#ffffff'
  },
  colorButtons: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  colorButton: {
    padding: '8px 20px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  colorButtonActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
    color: '#ffffff'
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  quantityButton: {
    width: '36px',
    height: '36px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer'
  },
  quantityText: {
    fontSize: '18px',
    fontWeight: '600',
    minWidth: '30px',
    textAlign: 'center'
  },
  stock: {
    marginBottom: '32px'
  },
  inStock: {
    color: '#10b981',
    fontSize: '14px',
    fontWeight: '500'
  },
  outOfStock: {
    color: '#ef4444',
    fontSize: '14px',
    fontWeight: '500'
  },
  actions: {
    display: 'flex',
    gap: '16px'
  },
  addButton: {
    flex: 1,
    padding: '14px',
    fontSize: '16px'
  },
  continueButton: {
    padding: '14px 24px',
    fontSize: '16px'
  }
};

export default ProductDetails;
