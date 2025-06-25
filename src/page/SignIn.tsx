import React, { useState } from 'react';
import './SignInPage.css';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="signin-page">
      <div className="background-overlay"></div>
      
      <div className="signin-container">
        {/* Logo Section */}
        <div className="logo-section">
          <img src="/signinpagelogo.svg" alt="Sign In Page Logo" style={{ height: 48 }} />
        </div>

        {/* Sign In Form Container */}
        <form className="form-container" onSubmit={handleLogin}>
          <div className="text-container">
            <h1 className="signin-title">Sign in</h1>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email address"
                className="input-field"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="input-field"
                required
              />
            </div>
          </div>

          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;