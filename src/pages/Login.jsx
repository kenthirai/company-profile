import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h2>Tukang Web</h2>
            <p>Admin Dashboard Portal</p>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="login-error">{error}</div>}
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
                required 
                placeholder="Enter email address"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  required 
                  placeholder="Enter password"
                />
                <button 
                  type="button" 
                  className="btn-show-hide" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>

            <div className="login-divider">
              <span>atau</span>
            </div>
            
            <button type="button" className="google-btn" onClick={() => setShowModal(true)}>
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="google-icon" />
              Login dengan Google
            </button>
          </form>
          <div className="login-footer">
            <a href="/">&larr; Back to Website</a>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Fitur Belum Diaktifkan</h3>
            <p>Tombol <strong>Login dengan Google</strong> ini masih belum diaktifkan.</p>
            <p>Kami masih menunggu kepastian dari pemilik website apakah setuju menggunakan metode autentikasi Google atau tetap mempertahankan formulir tradisional.</p>
            <button onClick={() => setShowModal(false)} className="modal-close-btn">Mengerti</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
