import React, { useState } from 'react';

const LoginForm = ({ onLogin, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin(formData);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <i className="fas fa-sign-in-alt"></i>
          <h2>Login to PAGEBLOOM</h2>
          <p>Welcome back! Please sign in to your account.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@pagebloom.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="admin123"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>Demo: <strong>admin@pagebloom.com</strong> / <strong>admin123</strong></p>
          <button className="link-btn" onClick={onSwitchToSignup}>
            Don't have an account? <strong>Sign Up</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
