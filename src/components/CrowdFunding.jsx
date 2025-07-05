import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/CrowdFunding.css';

const campaigns = [
  {
    id: 1,
    title: 'Support Eye Surgery for Underprivileged',
    description: 'Help us fund cataract surgeries for 50 elderly villagers in remote Rajasthan.',
    place: 'Agra, UP',
    postedOn: 'June 8, 2025',
    image: 'https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg',
    raised: 0,
    goal: 100000,
  },
  {
    id: 2,
    title: 'Education Kits for Rural Kids',
    description: 'Provide books, bags, and stationery to 100 school kids in rural Gujarat.',
    place: 'Agra, UP',
    postedOn: 'June 5, 2025',
    image: 'https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg',
    raised: 0,
    goal: 80000,
  },
  {
    id: 3,
    title: 'Planting 1 Lakh trees',
    description: 'Join our mission to plant 1 lakh trees across cities and villages. Your support helps build a sustainable, green environment for generations to come.',
    place: 'All over the nation',
    postedOn: 'June 30, 2025',
    image: 'https://www.ugaoo.com/cdn/shop/articles/shutterstock_649766830.jpg?v=1661881786',
    raised: 0,
    goal: 10000000,
  },
];


function Crowdfunding({ preview = false }) {
  const completed = campaigns.filter(c => c.raised >= c.goal);
  const active = campaigns.filter(c => c.raised < c.goal);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register-campaign');
  };

  const handleDonateClick = () => {
    navigate('/donate');
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/campaign/${id}`;
    if (navigator.share) {
      navigator
        .share({
          title: 'Check out this campaign!',
          text: 'Help support this cause:',
          url,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const renderCampaign = (c) => {
    const percent = Math.min((c.raised / c.goal) * 100, 100).toFixed(1);

    return (
      <div className="campaign-card" key={c.id}>
        <img src={c.image} alt={c.title} />
        <div className="campaign-content">
          <h2>{c.title}</h2>
          <p className="campaign-location">{c.place} | Posted on {c.postedOn}</p>
          <p>{c.description}</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <p className="progress-text">
            ₹{c.raised.toLocaleString()} raised of ₹{c.goal.toLocaleString()}
          </p>
          <div className="campaign-buttons">
            <button
              className="participate-btn"
              onClick={() => handleShare(c.id)}
            >
              Share
            </button>
            {c.raised < c.goal && (
              <button className="donate-btn" onClick={handleDonateClick}>
                Donate
              </button>
            )}
            {c.raised >= c.goal && (
              <span className="completed-tag">🎉 Goal Achieved</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="crowdfunding-section">
      {!preview && (
        <>
          <h1 className="crowdfunding-title">Crowdfunding Campaigns</h1>
          <div className="register-campaign-container">
            <button
              className="register-campaign-btn"
              onClick={handleRegisterClick}
            >
              📢 Register Your Campaign
            </button>
            <p className="review-note">
              All campaigns are submitted for review to ensure authenticity.
            </p>
          </div>
        </>
      )}

      {active.length > 0 && (
        <>
          <h2 className="subsection-heading">
            {preview ? 'Active Crowdfunding Campaigns' : 'Active Campaigns'}
          </h2>
          <div className="campaigns-grid">
            {active
              .slice(0, preview ? 2 : active.length)
              .map(renderCampaign)}
          </div>
          {preview && (
            <div style={{ marginTop: '2rem' }}>
              <Link to="/crowd-funding" className="see-all-btn">
                See All Campaigns →
              </Link>
            </div>
          )}
        </>
      )}

      {!preview && completed.length > 0 && (
        <>
          <h2 className="subsection-heading">Completed Campaigns</h2>
          <div className="campaigns-grid">
            {completed.map(renderCampaign)}
          </div>
        </>
      )}
    </section>
  );
}

export default Crowdfunding;