import React, { useState } from 'react';
import '../styles/MemberApply.css';
import axios from 'axios';

function MemberApply() {

  const [formData, setFormData] = useState({
    name: '', dob: '', profession: '', gender: '', fatherName: '',
    bloodGroup: '', district: '', state: '', mobile: '',
    whatsapp: '', address: '', pinCode: '', email: ''
  });

  const handleChange = (e) => {
    const {name, value, files} = e.target;
    setFormData({...formData, [name]: files? files[0] : value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/memberApply`,
        formData);
      alert('Form submitted successfully!');
      console.log(res.data);
      }
    catch (err) {
      console.error(err);
      alert('Error submitting form');
    }};

  return (
    <section className="member-apply-section">
      <h1 className="member-title">Member Application Form</h1>
      <form className="member-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input type="date" name="dob" placeholder="DOB" required onChange={handleChange} />
          <input type="text" name="profession" placeholder="Profession" onChange={handleChange} />
          <select name="gender" required onChange={handleChange}>
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="text" name="fatherName" placeholder="Father's Name" onChange={handleChange} />
          <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
          <input type="text" name="district" placeholder="District" onChange={handleChange} />
          <input type="text" name="state" placeholder="State" onChange={handleChange} />
          <input type="tel" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
          <input type="tel" name="whatsapp" placeholder="WhatsApp Number" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="text" name="pinCode" placeholder="PIN Code" onChange={handleChange} />
        </div>

        <textarea name="address" placeholder="Full Address" rows="3" onChange={handleChange}></textarea>

        <div className="file-section">
          <label>Upload Profile Picture</label>
          <input type="file" accept="image/*" name="profilePicture" onChange={handleChange} />

          <label>Upload Legal ID Card</label>
          <input type="file" accept="application/pdf,image/*" name="aadhar" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Apply Now</button>
      </form>
    </section>
  )
}

export default MemberApply;
