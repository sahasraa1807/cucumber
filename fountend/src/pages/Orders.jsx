import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_URL from '../config';


const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
     const { data } = await axios.get(`${API_URL}/api/orders/myorders`, config);

      setOrders(data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Processing': '#f59e0b',
      'Shipped': '#3b82f6',
      'Delivered': '#10b981',
      'Cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div style={styles.container}>
      <div className="container">
        <h1 style={styles.title}>My Orders</h1>

        {orders.length === 0 ? (
          <div style={styles.empty}>
            <p>No orders yet</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={styles.orders}>
            {orders.map((order) => (
              <div key={order._id} style={styles.order}>
                <div style={styles.orderHeader}>
                  <div>
                    <h3 style={styles.orderId}>Order #{order._id.slice(-8)}</h3>
                    <p style={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div style={styles.statusBadge}>
                    <span style={{...styles.status, backgroundColor: getStatusColor(order.orderStatus)}}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div style={styles.orderItems}>
                  {order.orderItems.map((item, index) => (
                    <div key={index} style={styles.orderItem}>
                      <img src={item.image} alt={item.name} style={styles.orderItemImage} />
                      <div style={styles.orderItemInfo}>
                        <h4 style={styles.orderItemName}>{item.name}</h4>
                        <p style={styles.orderItemDetails}>
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                          {item.color && ` • ${item.color}`}
                        </p>
                      </div>
                      <div style={styles.orderItemPrice}>₹{item.price}</div>
                    </div>
                  ))}
                </div>

                <div style={styles.orderFooter}>
                  <div style={styles.orderInfo}>
                    <p><strong>Payment:</strong> {order.paymentMethod}</p>
                    <p><strong>Status:</strong> {order.paymentStatus}</p>
                  </div>
                  <div style={styles.orderTotal}>
                    <span style={styles.totalLabel}>Total:</span>
                    <span style={styles.totalPrice}>₹{order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
  empty: {
    textAlign: 'center',
    padding: '80px 20px'
  },
  orders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  order: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #e5e7eb'
  },
  orderId: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px'
  },
  orderDate: {
    fontSize: '14px',
    color: '#6b7280'
  },
  statusBadge: {},
  status: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#ffffff'
  },
  orderItems: {
    padding: '20px 24px'
  },
  orderItem: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f3f4f6'
  },
  orderItemImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  orderItemInfo: {
    flex: 1
  },
  orderItemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '6px'
  },
  orderItemDetails: {
    fontSize: '14px',
    color: '#6b7280'
  },
  orderItemPrice: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#10b981'
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    backgroundColor: '#f9fafb',
    borderTop: '1px solid #e5e7eb'
  },
  orderInfo: {
    fontSize: '14px',
    color: '#374151'
  },
  orderTotal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  totalLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px'
  },
  totalPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#10b981'
  }
};

export default Orders;
