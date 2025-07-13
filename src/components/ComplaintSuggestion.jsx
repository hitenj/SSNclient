import React, { useState } from 'react';
import '../styles/ComplaintSuggestion.css';
import axios from 'axios';

function ComplaintSuggestion() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    mobile: '',
    message: '',
    description: '',
    videoUrl: '',
    documents: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/complaints`,
        formData);
      alert('Form submitted successfully!');
      console.log(res.data);
      }
    catch (err) {
      console.error(err);
      alert('Error submitting form');
    }};

  return (
    <section className="complaint-section">
      <div className="complaint-header">
        <h1>Complaint / Suggestion</h1>
        <p>Share your concerns or suggestions with us. We're listening!</p>
      </div>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />

        <label htmlFor="mobile">Mobile Number</label>
        <input
          id="mobile"
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message Title</label>
        <input
          id="message"
          type="text"
          name="message"
          placeholder="Message Title"
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Detailed Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Detailed Description"
          rows="4"
          onChange={handleChange}
          required
        />

        <label htmlFor="videoUrl">YouTube or Video URL (optional)</label>
        <input
          id="videoUrl"
          type="url"
          name="videoUrl"
          placeholder="YouTube or Video URL (optional)"
          onChange={handleChange}
        />

        <label htmlFor="documents">Upload Documents (optional)</label>
        <input
          id="documents"
          type="file"
          name="documents"
          onChange={handleChange}
        />

        <div className="complaint-buttons">
          <a
            className="whatsapp-btn"
            href="https://web.whatsapp.com/send?phone=YOURNUMBER"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}

export default ComplaintSuggestion;
