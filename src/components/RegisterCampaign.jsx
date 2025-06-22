import React, {useState} from 'react';
import '../styles/RegisterCampaign.css';

function RegisterCampaign() {

    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');

    const sendOtp = () => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(generatedOtp);
        setOtpSent(true);
        alert(`OTP for demo: ${generatedOtp}`);
      };
    
    const verifyOtp = () => {
        if (enteredOtp === otp) {
          setOtpVerified(true);
        } else {
          alert("Invalid OTP");
        }
      };

    return (
        <div className="register-campaign">
      <div className="campaign-header">
        <h1>Register a New Campaign</h1>
        <p>Submit your cause for review and help others support you.</p>
      </div>

      <form className="campaign-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Campaign Title</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Posted On</label>
            <input type="date" required />
          </div>
          <div className="form-group">
            <label>Place</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Campaign Description</label>
            <textarea rows="4" required></textarea>
          </div>
          <div className="form-group">
            <label>Photos (Campaign Images)</label>
            <input type="file" accept="image/*" multiple />
          </div>
          <div className="form-group">
            <label>Target Amount (₹)</label>
            <input type="number" required />
          </div>

          <div className="form-group">
            <label>Your Full Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" maxLength={10} required />
            {!otpSent && <button type="button" onClick={sendOtp}>Send OTP</button>}
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
              <button type="button" onClick={verifyOtp}>Verify OTP</button>
            </div>
          )}

          <div className="form-group">
            <label>Aadhaar Card (PDF or Image)</label>
            <input type="file" accept=".pdf,image/*" required />
          </div>
          <div className="form-group">
            <label>PAN Card</label>
            <input type="file" accept=".pdf,image/*" required />
          </div>
          <div className="form-group">
            <label>Voter ID</label>
            <input type="file" accept=".pdf,image/*" required />
          </div>
          <div className="form-group">
            <label>Additional Documents (Optional)</label>
            <input type="file" accept=".pdf,image/*" multiple />
          </div>
        </div>

        <div className="submit-wrap">
          <button className="submit-btn" type="submit" disabled={!otpVerified}>
            Submit for Review
          </button>
        </div>
      </form>
    </div>
    );
}

export default RegisterCampaign;
