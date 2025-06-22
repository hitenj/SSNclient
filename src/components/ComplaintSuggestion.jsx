import React, {useState} from 'react';
import '../styles/ComplaintSuggestion.css';

function ComplaintSuggestion() {

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    mobile: '',
    message: '',
    description: '',
    videoUrl: '',
    documents: null,
  })

  const handleChange = (e) => {
    const {name, value, files} = e.target;

    setFormData({
        ...formData,
        [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your complaint/suggestion has been registered!');
  };

  return (
    <section className="complaint-section">
      <div className="complaint-header">
        <h1>Complaint / Suggestion</h1>
        <p>Share your concerns or suggestions with us. We're listening!</p>
      </div>

      <form className="complaint-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input type="text" name="message" placeholder="Message Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Detailed Description" rows="4" onChange={handleChange} required />
        <input type="url" name="videoUrl" placeholder="YouTube or Video URL (optional)" onChange={handleChange} />
        <input type="file" name="documents" onChange={handleChange} />

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
  )
}

export default ComplaintSuggestion;
