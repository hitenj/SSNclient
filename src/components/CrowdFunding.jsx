import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CrowdFunding.css';

const campaigns = [
    {
      id: 1,
      title: 'Support Eye Surgery for Underprivileged',
      description: 'Help us fund cataract surgeries for 50 elderly villagers in remote Rajasthan.',
      place: 'Jodhpur, Rajasthan',
      postedOn: 'June 8, 2025',
      image: 'https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg',
      raised: 100000,
      goal: 100000,
    },
    {
      id: 2,
      title: 'Education Kits for Rural Kids',
      description: 'Provide books, bags, and stationery to 100 school kids in rural Gujarat.',
      place: 'Bhavnagar, Gujarat',
      postedOn: 'June 5, 2025',
      image: 'https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg',
      raised: 58000,
      goal: 80000,
    },
  ];

function Crowdfunding() {

    const completed = campaigns.filter(c => c.raised >= c.goal);
    const active = campaigns.filter(c => c.raised < c.goal);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/register-campaign');
    }

    const handleDonateClick = () => { 
      navigate('/donate');
    };


    const renderCampaign = (c) => {
        const percent = Math.min((c.raised/c.goal) * 100, 100).toFixed(1);

        return (
            <div className="campaign-card" key={c.id}>
        <img src={c.image} alt={c.title} />
        <div className="campaign-content">
          <h2>{c.title}</h2>
          <p className="campaign-location">{c.place} | Posted on {c.postedOn}</p>
          <p>{c.description}</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percent}%` }}></div>
          </div>
          <p className="progress-text">₹{c.raised.toLocaleString()} raised of ₹{c.goal.toLocaleString()}</p>
          <div className="campaign-buttons">
            <button className="participate-btn">Participate</button>
            {c.raised < c.goal && <button className="donate-btn" onClick={handleDonateClick}>Donate</button>}
            {c.raised >= c.goal && <span className="completed-tag">🎉 Goal Achieved</span>}
            </div>
            </div>
        </div>
        );
    };

    return (
    <section className="crowdfunding-section">
      <h1 className="crowdfunding-title">Crowdfunding Campaigns</h1>

      <div className="register-campaign-container">
        <button className="register-campaign-btn" onClick={handleRegisterClick}>
          📢 Register Your Campaign
        </button>
        <p className="review-note">All campaigns are submitted for review to ensure authenticity.</p>
      </div>

    { active.length > 0 && (
        <>
          <h2 className="subsection-heading">Active Campaigns</h2>
          <div className="campaigns-grid">{active.map(renderCampaign)}</div>
        </>
      )}

    {completed.length > 0 && (
        <>
          <h2 className="subsection-heading">Completed Campaigns</h2>
          <div className="campaigns-grid">{completed.map(renderCampaign)}</div>
        </>
      )}

    </section>

    );
}

export default Crowdfunding;
