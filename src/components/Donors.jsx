import React, {useState} from 'react'; 
import '../styles/Donors.css';

const donorsData = [
    { id: 1, name: "Ramesh Jain", amount: 5000, city: "Mumbai", mode: "Online", image: "https://st4.depositphotos.com/9998432/22597/v/600/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg" },
    { id: 2, name: "Sunita Shah", amount: 2000, city: "Ahmedabad", mode: "Cash", image: "https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg" },
    { id: 3, name: "Mahesh Mehta", amount: 10000, city: "Delhi", mode: "Online", image: "https://st4.depositphotos.com/9998432/22597/v/600/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg" },
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
