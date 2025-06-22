import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';

function SignUp() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Mobile Number" required />
          <input type="email" placeholder="Email ID" required />
          <input type="text" placeholder="City" />
          <textarea placeholder="Address"></textarea>
          <input type="file" accept="image/*" />
          <input type="password" placeholder="Set Password" required />
          <div className="terms">
            <input type="checkbox" required />
            <label>I accept the Terms & Conditions</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <div className="google-auth">
          <p>Or sign up with</p>
          <button className="google-btn">Sign up with Google</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;