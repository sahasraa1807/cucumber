import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API_URL from '../config';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const { data } = await axios.post(`${API_URL}/api/auth/register`, registerData);
      login(data);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join Cucumber and start shopping</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              autoComplete="tel"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password (min 6 characters)"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input
              id="street"
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
              placeholder="Enter street address"
              autoComplete="street-address"
            />
          </div>

          <div style={styles.row}>
            <div className="form-group" style={styles.halfWidth}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
                placeholder="City"
                autoComplete="address-level2"
              />
            </div>

            <div className="form-group" style={styles.halfWidth}>
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                required
                placeholder="State"
                autoComplete="address-level1"
              />
            </div>
          </div>

          <div style={styles.row}>
            <div className="form-group" style={styles.halfWidth}>
              <label htmlFor="pincode">Pincode</label>
              <input
                id="pincode"
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                required
                placeholder="Pincode"
                autoComplete="postal-code"
              />
            </div>

            <div className="form-group" style={styles.halfWidth}>
              <label htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                required
                disabled
                autoComplete="country-name"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitButton} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '8px',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '32px',
    textAlign: 'center'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  halfWidth: {
    width: '100%'
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    marginTop: '8px'
  },
  loginText: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#6b7280'
  },
  link: {
    color: '#10b981',
    fontWeight: '500'
  }
};

export default Register;
