import React from 'react';
import { FaArrowUp, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';
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
          <p><FaMapMarkerAlt /> Agra, India</p>
          <p><FaPhoneAlt /> +91 97594 97594</p>
          <p><FaEnvelope /> sarvarthasiddhifoundation@gmail.com</p>
 
          <div className="footer-social-icons">
            <h4>Follow Us</h4>
            <a href="https://www.facebook.com/people/Sarvarthasid2dhi-Foundation/100081490568810/"><FaFacebookF /></a>
            <a href="https://wa.me/919149171856"><FaWhatsapp /></a>
            <a href="https://www.instagram.com/sarvarthasiddhifoundation/"><FaInstagram /></a>
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
        <p>&copy; {new Date().getFullYear()} Sarvartha Siddhi Foundation. All rights reserved.</p>
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp /> Back to Top
        </button>
      </div>
    </footer>
  )
}

export default Footer;
