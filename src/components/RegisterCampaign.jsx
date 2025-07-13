import React, { useState } from 'react';
import '../styles/RegisterCampaign.css';
import axios from 'axios';

function RegisterCampaign() {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    postedOn: '',
    place: '',
    description: '',
    images: [],
    targetAmount: '',
    fullName: '',
    mobile: '',
    aadhaar: null,
    pan: null,
    voterId: null,
    additionalDocs: []
  });

  // Send demo OTP
  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpSent(true);
    alert(`OTP for demo: ${generatedOtp}`);
  };

  // Verify entered OTP
  const verifyOtp = () => {
    if (enteredOtp === otp) {
      setOtpVerified(true);
      alert('OTP verified successfully!');
    } else {
      alert('Invalid OTP');
    }
  };

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      if (e.target.multiple) {
        setFormData({
          ...formData,
          [name]: Array.from(files),
        });
      } else {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    data.append('title', formData.title);
    data.append('postedOn', formData.postedOn);
    data.append('place', formData.place);
    data.append('description', formData.description);
    data.append('targetAmount', formData.targetAmount);
    data.append('fullName', formData.fullName);
    data.append('mobile', formData.mobile);

    // Single file fields
    if (formData.aadhaar) data.append('aadhaar', formData.aadhaar);
    if (formData.pan) data.append('pan', formData.pan);
    if (formData.voterId) data.append('voterId', formData.voterId);

    // Multiple images
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((img) => data.append('images', img));
    }

    // Multiple additional docs
    if (formData.additionalDocs && formData.additionalDocs.length > 0) {
      formData.additionalDocs.forEach((doc) => data.append('additionalDocs', doc));
    }

    const res = await axios.post(
      'http://localhost:5000/api/registerCampaign',
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    alert('Thank you for your question!');
    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert('Error submitting form');
  }
};

  return (
    <div className="register-campaign">
      <div className="campaign-header">
        <h1>Register a New Campaign</h1>
        <p>Submit your cause for review and help others support you.</p>
      </div>

      <form className="campaign-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Campaign Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Posted On</label>
            <input
              type="date"
              name="postedOn"
              value={formData.postedOn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Campaign Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Photos (Campaign Images)</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Target Amount (₹)</label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              maxLength={10}
              required
              disabled={otpSent}
            />
            {!otpSent && (
              <button type="button" onClick={sendOtp}>
                Send OTP
              </button>
            )}
          </div>

          {otpSent && !otpVerified && (
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                maxLength={6}
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
              />
              <button type="button" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
          )}

          <div className="form-group">
            <label>Aadhaar Card (PDF or Image)</label>
            <input
              type="file"
              name="aadhaar"
              accept=".pdf,image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>PAN Card</label>
            <input
              type="file"
              name="pan"
              accept=".pdf,image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Voter ID</label>
            <input
              type="file"
              name="voterId"
              accept=".pdf,image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Additional Documents (Optional)</label>
            <input
              type="file"
              name="additionalDocs"
              accept=".pdf,image/*"
              multiple
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="submit-wrap">
          <button
            className="submit-btn"
            type="submit"
            disabled={!otpVerified}
          >
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterCampaign;
