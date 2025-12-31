import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/Jioji_logo.png';
import { useAuth } from '../../context/AuthContext';
import { User, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authLogin(formData, 'admin');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-container">
      <div className="login-white-card">
        <div className="login-header">
          <img src={logo} alt="JIOJI GREEN INDIA" className="login-logo-img" />
          <h1 className="brand-name">Farm Products & Seeds</h1>
          <h2 className="portal-sub">Admin Portal</h2>
        </div>

        {error && <div className="error-text">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Username" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <User size={18} className="input-icon" />
          </div>

          <div className="input-field-group">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
            <div className="input-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            {/* UPDATED LINK TO FORGOT PASSWORD PAGE */}
            <Link to="/forgot-password" size={18} className="forgot-link">Forget Password?</Link>
          </div>

          <p className="terms-text">
            *By clicking register free, I agree to the T&C and Privacy Policy
          </p>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;