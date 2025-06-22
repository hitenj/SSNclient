import React from 'react';
import '../styles/Donation.css';

function Donation() {
  return (
    <section className="donation-section">
      <h1 className="donation-title">Support Sarvarth Siddhi</h1>
      <p className="donation-subtitle">Your contribution helps sustain our mission and services.</p>

      <div className="donation-grid">
        <div className="donation-card">
          <h2>Scan & Pay</h2>
          <img 
            src="https://pngimg.com/uploads/qr_code/qr_code_PNG7.png" 
            alt="QR Code for Donation"
            className="qr-image"
          />
        </div>

        <div className="donation-card">
          <h2>Bank Details</h2>
          <p><strong>Account Name:</strong> Sarvarth Siddhi Foundation</p>
          <p><strong>Bank:</strong> State Bank of India</p>
          <p><strong>A/C Number:</strong> 123456789012</p>
          <p><strong>IFSC:</strong> SBIN0001234</p>
        </div>

        <div className="donation-card">
          <h2>Membership</h2>
          <p>One-time Membership Charge:</p>
          <p className="charge">₹501</p>
          <p>Includes access to events and newsletters.</p>
        </div>
      </div>

      <div className="donation-center">
        <button className="donation-button">Pay Online</button>
      </div>
    </section>
  )
}

export default Donation;
