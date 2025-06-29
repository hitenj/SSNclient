import React, { useState } from 'react';
import '../styles/UpcomingEvents.css';

function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    mobile: '',
    isTeamMember: 'no',
    memberId: ''
  });

  const events = [
    {
      title: 'Medical Camp',
      date: 'July 15, 2025',
      location: 'Agra, India',
      description: 'Free health checkup and medicines for all.',
      image: 'https://images.pexels.com/photos/6749777/pexels-photo-6749777.jpeg'
    },
    {
      title: 'Tree Plantation Drive',
      date: 'August 8, 2025',
      location: 'Mathura, India',
      description: 'Join us in planting trees for a greener future.',
      image: 'https://images.pexels.com/photos/572679/pexels-photo-572679.jpeg'
    }
  ];

  const handleBookSeat = (eventTitle) => {
    setSelectedEvent(eventTitle);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData, "For Event:", selectedEvent);
    alert(`Booking confirmed for ${selectedEvent}!`);
    setSelectedEvent(null);
    setFormData({
      fullName: '',
      city: '',
      mobile: '',
      isTeamMember: 'no',
      memberId: ''
    });
  };

  return (
    <section className="upcoming-events">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Be a part of our initiatives and make a difference!</p>
      </div>

      <div className="events-grid">
        {events.map((ev, idx) => (
          <div className="event-card" key={idx}>
            <img src={ev.image} alt={ev.title} />
            <div className="event-content">
              <h2>{ev.title}</h2>
              <p className="event-meta">{ev.date} • {ev.location}</p>
              <p>{ev.description}</p>
              <button onClick={() => handleBookSeat(ev.title)}>Book Seat</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedEvent(null)}>×</button>
            <div className="booking-form">
              <h3>Book Seat for: {selectedEvent}</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  required
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <label>Are you in our team?</label>
                <select
                  name="isTeamMember"
                  value={formData.isTeamMember}
                  onChange={handleInputChange}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
                {formData.isTeamMember === 'yes' && (
                  <input
                    type="text"
                    name="memberId"
                    placeholder="Member ID"
                    value={formData.memberId}
                    onChange={handleInputChange}
                    required
                  />
                )}
                <button type="submit">Confirm Booking</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UpcomingEvents;
