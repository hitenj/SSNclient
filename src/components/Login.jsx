import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Coordinator/Admin Login</h2>
        <form>
          <input type="text" placeholder="Email or Mobile" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {/* <div className="google-auth">
          <p>Or login with</p>
          <button className="google-btn">Login with Google</button>
        </div> */}
      </div>
    </div>
  );
}

export default Login;