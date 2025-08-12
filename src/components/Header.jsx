import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import "../styles/Header.css";
import PlantLogo from "../assets/logo-bg.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="ngo-header">
      <div className="header-container">
        <div
          className="logo"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <img src={PlantLogo} alt="Sarvartha Siddhi Foundation logo" className="plant-logo" />

          <Link to="/" onClick={closeMenu} className="logo-text">
            <span className="full-name">SARVARTHASIDDHI FOUNDATION</span>
            <span className="short-name">SARVARTHASIDDHI.org</span>
          </Link>
        </div>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>

        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <Link to="/about" onClick={closeMenu}>
            About Us
          </Link>
          <Link to="/crowd-funding" onClick={closeMenu}>
            CrowdFunding
          </Link>
          {/*<Link to="/apply" onClick={closeMenu}>Member Apply</Link>*/}
          <Link to="/event" onClick={closeMenu}>
            Upcoming Event
          </Link>
          <Link to="/donors" onClick={closeMenu}>
            List of Donors
          </Link>
          <Link to="/complaint" onClick={closeMenu}>
            Need Help?
          </Link>
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
          <div className="mobile-header-actions">
            <div className="social-icons">
              <a href="https://www.facebook.com/people/Sarvarthasiddhi-Foundation/100081490568810/">
                <FaFacebookF />
              </a>
              <a href="https://wa.me/919149171856">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/sarvarthasiddhifoundation/">
                <FaInstagram />
              </a>
            </div>
            <Link to="/donate" className="donate-btn" onClick={closeMenu}>
              Donate
            </Link>
          </div>
        </nav>

        <div className="header-actions">
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Sarvarthasiddhi-Foundation/100081490568810/">
              <FaFacebookF />
            </a>
            <a href="https://wa.me/919149171856">
              <FaWhatsapp />
            </a>
            <a href="https://www.instagram.com/sarvarthasiddhifoundation/">
              <FaInstagram />
            </a>
          </div>
          <Link to="/donate" className="donate-btn">
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
