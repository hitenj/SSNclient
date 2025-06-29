import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="ngo-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>SARVARTHA SIDDHI FOUNDATION</Link>
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>

        <nav className={`nav ${isOpen ? 'open' : ''}`}>
          <Link to="/about" onClick={closeMenu}>About Us</Link>
          {/*<Link to="/apply" onClick={closeMenu}>Member Apply</Link>*/}
          <Link to="/event" onClick={closeMenu}>Upcoming Event</Link>
          <Link to="/complaint" onClick={closeMenu}>Your Problems</Link>
          <Link to="/donors" onClick={closeMenu}>List of Donors</Link>
          <Link to="/crowd-funding" onClick={closeMenu}>CrowdFunding</Link>
          <Link to="/login" onClick={closeMenu}>Login</Link>
          <div className="mobile-header-actions">
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
            </div>
            <Link to="/donate" className="donate-btn" onClick={closeMenu}>
              Donate
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
          <Link to="/donate" className="donate-btn">Donate</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
