import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/CrowdFunding.css";
import axios from "axios";

// Static campaigns list
const initialCampaigns = [
  {
    id: 1,
    title: "Education Kits for Rural Kids",
    description:
      "Provide books, bags, and stationery to 100 underprivileged school children.",
    place: "Agra, UP",
    postedOn: "August 3, 2025",
    purpose: "Corpus - Education",
    image:
      "https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg",
    raised: 0,
    goal: 80000,
  },
  {
    id: 2,
    title: "Planting 1 Lakh trees",
    description:
      "Join our mission to plant 1 lakh trees across cities and villages. Your support helps build a sustainable, green environment for generations to come.",
    place: "All over the nation",
    postedOn: "July 30, 2025",
    purpose: "Corpus - Plantation",
    image:
      "https://www.ugaoo.com/cdn/shop/articles/shutterstock_649766830.jpg?v=1661881786",
    raised: 0,
    goal: 10000000,
  },
];

export default function Crowdfunding({ preview = false }) {
  const [campaignsData, setCampaignsData] = useState(initialCampaigns);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchTotals = async () => {
      setLoading(true);
      setError(null);

      try {
        // build URL: if API_BASE is empty, calls same origin
        const url = `${process.env.REACT_APP_API_URL}/api/donations/totals`;
        const res = await axios.get(url);

        // `res.data` expected to be an object: { "corpus - plantation": 101, "corpus - education": 5000 }
        const totals = res.data || {};

        if (!mounted) return;

        const updated = initialCampaigns.map((camp) => {
          const key = camp.purpose.trim().toLowerCase();
          const raised = typeof totals[key] !== "undefined" ? totals[key] : 0;
          return { ...camp, raised };
        });

        setCampaignsData(updated);
      } catch (err) {
        console.error("Error fetching totals:", err?.response || err.message || err);
        setError(err);
        // keep campaignsData as initialCampaigns or previous state
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTotals();

    return () => {
      mounted = false;
    };
  }, []);

  const handleRegisterClick = () => navigate("/register-campaign");

  const handleDonateClick = (campaign) => {
    navigate("/donate", { state: { prefilledPurpose: campaign.purpose } });
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/campaign/${id}`;
    if (navigator.share) {
      navigator
        .share({ title: "Check out this campaign!", text: "Help support this cause:", url })
        .catch((e) => console.error("Share failed:", e));
    } else {
      navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard!"));
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
            <div className="progress-bar" style={{ width: `${percent}%` }} />
          </div>

          <p className="progress-text">₹{c.raised.toLocaleString()} raised of ₹{c.goal.toLocaleString()}</p>

          <div className="campaign-buttons">
            <button className="participate-btn" onClick={() => handleShare(c.id)}>Share</button>

            {c.raised < c.goal ? (
              <button className="donate-btn" onClick={() => handleDonateClick(c)}>Donate</button>
            ) : (
              <span className="completed-tag">🎉 Goal Achieved</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const activeCampaigns = campaignsData.filter((c) => c.raised < c.goal);
  const completedCampaigns = campaignsData.filter((c) => c.raised >= c.goal);

  return (
    <section className="crowdfunding-section">
      {!preview && (
        <>
          <h1 className="crowdfunding-title">Crowdfunding Campaigns</h1>
          <div className="register-campaign-container">
            <button className="register-campaign-btn" onClick={handleRegisterClick}>📢 Register Your Campaign</button>
            <p className="review-note">All campaigns are submitted for review to ensure authenticity.</p>
          </div>
        </>
      )}

      {loading && <p>Loading campaigns...</p>}
      {error && <p style={{ color: "red" }}>Couldn't load totals — showing defaults.</p>}

      {activeCampaigns.length > 0 && (
        <>
          <h2 className="subsection-heading">{preview ? "Active Crowdfunding Campaigns" : "Active Campaigns"}</h2>
          <div className="campaigns-grid">{activeCampaigns.slice(0, preview ? 2 : activeCampaigns.length).map(renderCampaign)}</div>
          {preview && <div style={{ marginTop: "2rem" }}><Link to="/crowd-funding" className="see-all-btn">See All Campaigns →</Link></div>}
        </>
      )}

      {!preview && completedCampaigns.length > 0 && (
        <>
          <h2 className="subsection-heading">Completed Campaigns</h2>
          <div className="campaigns-grid">{completedCampaigns.map(renderCampaign)}</div>
        </>
      )}
    </section>
  );
}
