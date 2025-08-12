import React, { useEffect, useState } from 'react';
import '../styles/Donors.css';
import axios from 'axios';

function Donors() {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/donations`)
      .then((res) => {
        setDonors(res.data);
      })
      .catch((err) => {
        console.error('Error fetching donors:', err);
      });
  }, []);

  const filteredDonors = donors.filter((donor) =>
    donor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.whatsapp?.includes(searchTerm) ||
    donor.amount?.toString().includes(searchTerm)
  );

  return (
    <section className="donors-section">
      <h1 className="donors-heading">Donors</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="donor-cards">
        {filteredDonors.map((donor) => (
          <div key={donor._id} className="donor-card">
            <h2>{donor.name}</h2>
            <p>📍 {donor.city}</p>
            <p>📞 {donor.whatsapp?.replace(/(\d{2})\d{4}(\d{2})/, '$1****$2')}</p>
            <p>💸 ₹ {parseFloat(donor.amount).toFixed(2)}</p>
            <p>🗓 {new Date(donor.paymentDetails.created_at).toLocaleDateString('en-IN')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Donors;
