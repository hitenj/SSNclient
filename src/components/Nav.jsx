import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <nav className="nav">
          <Link to="/about">About Us</Link>
          <Link to="/apply">Member Apply</Link>
          <Link to="/event">Upcoming Event</Link>
          <Link to="/complaint">Your Problems</Link>
          <Link to="/donors">List of Donors</Link>
          <Link to="/crowd-funding">CrowdFunding</Link>
          <Link to="/login">Login</Link>
        </nav>
    </div>
  )
}

export default Nav;