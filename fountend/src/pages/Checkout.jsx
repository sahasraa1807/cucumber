import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_URL from '../config';


const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    pincode: user?.address?.pincode || '',
    country: user?.address?.country || 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const itemsPrice = getTotalPrice();
  const shippingPrice = itemsPrice > 999 ? 0 : 50;
  const taxPrice = itemsPrice * 0.18;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image,
          price: item.price
        })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

     const { data } = await axios.post(`${API_URL}/api/orders`, orderData, config);

      
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} className="btn btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title}>Checkout</h1>

        <div style={styles.content}>
          <div style={styles.leftSection}>
            <form onSubmit={handleSubmit}>
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Shipping Address</h2>
                
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    required
                  />
                </div>

                <div style={styles.row}>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>

                <div style={styles.row}>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      required
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Payment Method</h2>
                
                <div style={styles.paymentMethods}>
                  {['COD', 'Card', 'UPI', 'Net Banking'].map((method) => (
                    <label key={method} style={styles.paymentLabel}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={styles.radio}
                      />
                      <span>{method === 'COD' ? 'Cash on Delivery' : method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={styles.placeOrderButton} disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div style={styles.rightSection}>
            <div style={styles.summary}>
              <h2 style={styles.summaryTitle}>Order Summary</h2>

              <div style={styles.items}>
                {cartItems.map((item) => (
                  <div key={`${item._id}-${item.size}-${item.color}`} style={styles.item}>
                    <img src={item.image} alt={item.name} style={styles.itemImage} />
                    <div style={styles.itemInfo}>
                      <h4 style={styles.itemName}>{item.name}</h4>
                      <p style={styles.itemDetails}>
                        {item.size && `Size: ${item.size}`} {item.color && `• ${item.color}`}
                      </p>
                      <p style={styles.itemQuantity}>Qty: {item.quantity}</p>
                    </div>
                    <div style={styles.itemPrice}>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div style={styles.pricing}>
                <div style={styles.pricingRow}>
                  <span>Items Total:</span>
                  <span>₹{itemsPrice.toFixed(2)}</span>
                </div>
                <div style={styles.pricingRow}>
                  <span>Shipping:</span>
                  <span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice.toFixed(2)}`}</span>
                </div>
                <div style={styles.pricingRow}>
                  <span>Tax (18%):</span>
                  <span>₹{taxPrice.toFixed(2)}</span>
                </div>
                <div style={styles.totalRow}>
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
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
    minHeight: '70vh'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '32px'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '40px'
  },
  leftSection: {},
  rightSection: {},
  section: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  paymentMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  paymentLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  radio: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  },
  placeOrderButton: {
    width: '100%',
    padding: '14px',
    fontSize: '16px'
  },
  summary: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: '100px'
  },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '20px'
  },
  items: {
    marginBottom: '20px'
  },
  item: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  },
  itemImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  itemInfo: {
    flex: 1
  },
  itemName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  itemDetails: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  itemQuantity: {
    fontSize: '12px',
    color: '#6b7280'
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#10b981'
  },
  pricing: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '16px'
  },
  pricingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#374151'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '2px solid #e5e7eb',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111827'
  },
  empty: {
    textAlign: 'center',
    padding: '80px 20px',
    minHeight: '60vh'
  }
};

export default Checkout;
