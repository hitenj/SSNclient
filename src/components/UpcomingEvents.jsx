import React, { useState } from 'react';
import '../styles/UpcomingEvents.css';

const eventsData = [
  {
    id: 1,
    title: "Spiritual Awareness Camp",
    date: "June 15, 2025",
    location: "Jain Bhavan, Mumbai",
    description: "Join us for a day of meditation, teachings, and community bonding.",
    poster: "https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg",
  },
  {
    id: 2,
    title: "Charity Food Drive",
    date: "July 2, 2025",
    location: "Sarvarth Siddhi Center, Pune",
    description: "Help us distribute food to underprivileged communities.",
    poster: "https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg",
  },
  {
    id: 3,
    title: "Youth Volunteer Meetup",
    date: "August 9, 2025",
    location: "Online (Zoom)",
    description: "An open discussion for youth on Jain principles and service.",
    poster: "https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg",
  },
];

function UpcomingEvents() {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    city: '',
    mobile: '',
    isTeamMember: 'no',
    memberId: '',
  });

  const [submitted, setSubmitted] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleBookClick = (eventTitle) => {
    setSelectedEvent(eventTitle);
    setFormData({
      fullName: '',
      city: '',
      mobile: '',
      isTeamMember: 'no',
      memberId: '',
    });
    setSubmitted(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="upcoming-events">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Be a part of our mission—explore and register for upcoming activities.</p>
      </div>

      <div className="events-grid">
        {eventsData.map(event => (
          <div key={event.id} className="event-card">
            <img src={event.poster} alt={`${event.title} poster`} />
            <div className="event-content">
              <h2>{event.title}</h2>
              <p className="event-meta">{event.date} | {event.location}</p>
              <p>{event.description}</p>
              <button onClick={() => handleBookClick(event.title)}>Book Seat</button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="booking-form">
          <h3>Book Seat for: {selectedEvent}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full Name" required value={formData.fullName} onChange={handleInputChange} />
            <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} />
            <input type="tel" name="mobile" placeholder="Mobile Number" required value={formData.mobile} onChange={handleInputChange} />
            <label>Are you in our team?</label>
            <select name="isTeamMember" value={formData.isTeamMember} onChange={handleInputChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {formData.isTeamMember === 'yes' && (
              <input type="text" name="memberId" placeholder="Member ID" value={formData.memberId} onChange={handleInputChange} required />
            )}
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {submitted && (
        <div className="booking-alert">
          ✅ Seat successfully booked for: <strong>{selectedEvent}</strong>
        </div>
      )}
    </section>
  );
}

export default UpcomingEvents;