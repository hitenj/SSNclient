import React, { useState } from "react";
import "../styles/Donation.css";
import { handleRazorpayPayment } from "../utils/payment";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Donation() {
  const navigate = useNavigate();

  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    whatsapp: "",
    amount: location.state?.prefilledAmount?.toString() || "",
    pan: "",
    purpose: location.state?.prefilledPurpose || "",
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
      !formData.amount ||
      !formData.purpose
    ) {
      alert(
        "Please fill all required fields: Name, City, WhatsApp, Purpose and Amount."
      );
      return;
    }

    handleRazorpayPayment({
      amount: parseInt(formData.amount),
      donorDetails: formData,
      onSuccess: async (paymentResponse) => {
        try {
          // call backend verify + save donation
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/payment/verify`,
            {
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              donorDetails: formData,
            }
          );

          if (res.data && res.data.success) {
            const savedDonation = res.data.donation;
            // navigate to receipt using saved donation id
            navigate(`/receipt/${savedDonation._id}`);
          } else {
            alert("Payment verified but failed to save donation.");
          }
        } catch (err) {
          console.error("verify/save error", err);
          alert("Failed to verify/save donation. Contact admin.");
        }
      },
    });
  };

  return (
    <section className="donation-section">
      <h1 className="donation-title">Support SarvarthaSiddhi</h1>
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
          <label htmlFor="donationPurpose">Purpose of Donation:</label>
          <select
            id="donationPurpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            disabled={!!location.state?.prefilledPurpose} // prevents opening
          >
            {!location.state?.prefilledPurpose && (
              <option value="" disabled hidden>
                Select purpose
              </option>
            )}
            <optgroup label="Corpus">
              <option value="Corpus - Plantation">Plantation</option>
              <option value="Corpus - Medical Aid">Medical Aid</option>
              <option value="Corpus - Education">Education</option>
              <option value="Corpus - Women Empowerment">
                Women Empowerment
              </option>
            </optgroup>
            <optgroup label="Other">
              <option value="Other - General Donation">General Donation</option>
            </optgroup>
          </select>
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
            readOnly={!!location.state?.prefilledAmount}
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
