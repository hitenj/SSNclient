import React from "react";
import plantationImage from "../assets/plantation-banner.jpg"; // Replace with your actual image path
import "../styles/Banner.css";
import { handleRazorpayPayment } from "../utils/payment";

function HeaderBanner() {

    const donateNow = () => {
    handleRazorpayPayment({
      amount: 101,
      onSuccess: (response) => {
        console.log("Payment completed:", response);
      },
    });
  };

  return (
    <div
      className="banner-container"
      style={{
        backgroundImage: `linear-gradient(
          rgba(15, 110, 64, 0.5),
          rgba(15, 110, 64, 0.5)
        ), url(${plantationImage})`,
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">SARVARTHA SIDDHI FOUNDATION</h1>
        <p className="banner-subtitle">
          Plant one tree by donating just ₹101
        </p>
        <p className="banner-support">
          Together, let’s build a greener, healthier planet.
        </p>
        <button className="banner-button" onClick={donateNow}>
          Donate ₹101 Now
        </button>
      </div>
    </div>
  );
}

export default HeaderBanner;