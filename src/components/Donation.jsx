import React, { useState } from "react";
import "../styles/Donation.css";
import { handleRazorpayPayment } from "../utils/payment";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Donation() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    whatsapp: "",
    amount: "",
    pan: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.city ||
      !formData.whatsapp ||
      !formData.amount
    ) {
      alert(
        "Please fill all required fields: Name, City, WhatsApp, and Amount."
      );
      return;
    }

    handleRazorpayPayment({
      amount: parseInt(formData.amount),
      donorDetails: formData,
      onSuccess: (paymentResponse) => {
        console.log("Payment completed:", paymentResponse);
        const donationData = {
    ...formData,
    paymentId: paymentResponse.razorpay_payment_id,
    orderId: paymentResponse.razorpay_order_id,
    signature: paymentResponse.razorpay_signature,
    status: "success",
  };
        try {
          axios.post("http://localhost:5000/api/donations", donationData);
          console.log('Donation saved to DB!');
          navigate("/receipt", {
            state: {
              donorDetails: formData,
              paymentDetails: paymentResponse,
            },
          });
        } catch (error) {
          console.error("Error saving donation data:", error);
        }
      },
    });
  };

  return (
    <section className="donation-section">
      <h1 className="donation-title">Support Sarvarth Siddhi</h1>
      <p className="donation-subtitle">
        Your contribution helps sustain our mission and services.
      </p>

      <form className="donation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Donor Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City *</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
          ></input>
        </div>

        <div className="form-group">
          <label>WhatsApp Number *</label>
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            title="Please enter a valid WhatsApp number (digits only)"
          />
        </div>

        <div className="form-group">
          <label>Amount (INR) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>PAN Number (Optional — Required for 80G Tax Exemption)</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            title="PAN must be in format: ABCDE1234F"
          />
          <small className="pan-note">
            As per 12-Sub-clause (A) of clause (iv) of first proviso to
            sub-section (5) of section 80G
          </small>
        </div>

        <div className="donation-center">
          <button className="donation-button" type="submit">
            Pay Online
          </button>
        </div>
      </form>
    </section>
  );
}

export default Donation;
