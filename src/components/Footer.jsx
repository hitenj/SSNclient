import React from 'react';
import { FaArrowUp, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

  return (
    <footer className="ngo-footer">
      <div className="footer-container">
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><FaMapMarkerAlt /> 122 Jain Street, Agra, India</p>
          <p><FaPhoneAlt /> +91 96765 48210</p>
          <p><FaEnvelope /> info@sarvarthsiddhi.org</p>
 
          <div className="footer-social-icons">
            <h4>Follow Us</h4>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
 
        <div className="footer-section links">
          <h4>Useful Links</h4>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/apply">Member Apply</Link></li>
              <li><Link to="/event">Upcoming Event</Link></li>
              <li><Link to="/problems">Your Problems</Link></li>
              <li><Link to="/donors">List of Donors</Link></li>
              <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
 
        <div className="footer-section question-form">
          <h4>Ask a Question</h4>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" rows="3" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
 
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sarvarth Siddhi. All rights reserved.</p>
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp /> Back to Top
        </button>
      </div>
    </footer>
  )
}

export default Footer;
