import React from 'react';
import '../styles/Header.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaHandsHelping, FaHeart } from 'react-icons/fa';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="ngo-header">
      <div className="header-container">
        <div className="logo">
        <FaHeart />
          {/* <img src="/logo.png" alt="." /> */}
          <span><Link to={"/"}>Sarvarth Siddhi</Link></span>
        </div>
 
        <Nav />
 
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
  )
}

export default Header;
