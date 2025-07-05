import React, {useState} from 'react'; 
import '../styles/Donors.css';
import donor1 from '../assets/donor1.jpg';
import donor2 from '../assets/donor2.jpg';
import donor3 from '../assets/donor3.jpg';
import donor4 from '../assets/donor4.jpg';
import donor5 from '../assets/donor5.JPG';
import donor6 from '../assets/donor6.jpeg';

const donorsData = [
  { id: 1, name: "Piyush Jain", amount: 5000, city: "Gurugram", mode: "Online", image: donor1 },
  { id: 2, name: "Mamta Jain", amount: 2000, city: "Agra", mode: "Cash", image: donor2 },
  { id: 3, name: "Vartika Jain", amount: 10000, city: "Gurugram", mode: "Online", image: donor3 },
  { id: 4, name: "Sanjay Jain", amount: 10000, city: "Agra", mode: "Online", image: donor4 },
  { id: 5, name: "Hiten Jain", amount: 1300, city: "Agra", mode: "Online", image: donor5 },
  { id: 6, name: "Gunmala Jain", amount: 3000, city: "Agra", mode: "Online", image: donor6 },
];

function Donors() {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredDonors = donorsData.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.city.toLowerCase().includes(searchTerm.toLowerCase())
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
            {filteredDonors.map(donor => (
                <div key={donor.id} className="donor-card">
                <img src={donor.image} alt={donor.name} className="donor-photo" />
                <h2>{donor.name}</h2>
                <p>💸 ₹{donor.amount}</p>
                <p>📍 {donor.city}</p>
                <p>💳 {donor.mode}</p>
                </div>
            ))}
        </div>
    </section>

  );
}

export default Donors;
