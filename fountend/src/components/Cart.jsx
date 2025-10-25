import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, toggleCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      toggleCart();
    } else {
      navigate('/checkout');
      toggleCart();
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={toggleCart}></div>
      <div style={styles.cart}>
        <div style={styles.header}>
          <h2 style={styles.title}>Shopping Cart</h2>
          <button onClick={toggleCart} style={styles.closeButton}>✕</button>
        </div>

        <div style={styles.items}>
          {cartItems.length === 0 ? (
            <p style={styles.emptyText}>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={`${item._id}-${item.size}-${item.color}`} style={styles.item}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                
                <div style={styles.itemDetails}>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  {item.size && <p style={styles.itemInfo}>Size: {item.size}</p>}
                  {item.color && <p style={styles.itemInfo}>Color: {item.color}</p>}
                  <p style={styles.itemPrice}>₹{item.price}</p>
                </div>

                <div style={styles.itemActions}>
                  <div style={styles.quantity}>
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity - 1)}
                      style={styles.quantityButton}
                    >
                      -
                    </button>
                    <span style={styles.quantityText}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, item.color, item.quantity + 1)}
                      style={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id, item.size, item.color)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.total}>
              <span style={styles.totalLabel}>Total:</span>
              <span style={styles.totalPrice}>₹{getTotalPrice().toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn btn-primary" style={styles.checkoutButton}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999
  },
  cart: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '400px',
    maxWidth: '100%',
    height: '100vh',
    backgroundColor: '#ffffff',
    boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#6b7280',
    cursor: 'pointer'
  },
  items: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: '40px'
  },
  item: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    padding: '12px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  itemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  itemDetails: {
    flex: 1
  },
  itemName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  itemInfo: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '2px'
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#10b981',
    marginTop: '4px'
  },
  itemActions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  quantityButton: {
    width: '24px',
    height: '24px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  quantityText: {
    fontSize: '14px',
    fontWeight: '500',
    minWidth: '20px',
    textAlign: 'center'
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    fontSize: '12px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#374151'
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#10b981'
  },
  checkoutButton: {
    width: '100%'
  }
};

export default Cart;
