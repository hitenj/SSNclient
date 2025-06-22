import React from 'react';
import {FaBook, FaHandsHelping, FaHeartbeat, FaLeaf} from 'react-icons/fa';
import '../styles/Objectives.css';

function Objectives() {

    const objectives = [
        { icon: <FaBook />, title: 'Education', desc: 'Provide education, opportunities based on Jain values.' },
        { icon: <FaHeartbeat />, title: 'Healthcare', desc: 'Offer medical assistance guided by compassion and non-violence.' },
        { icon: <FaLeaf />, title: 'Environment', desc: 'Promote environmental sustainability and protection.' },
        { icon: <FaHandsHelping />, title: 'Community Service', desc: 'Engage in seva to uplift and support the underprivileged.' },
    ];

  return (
    <div className="objectives-section">
      <h2 className="objectives-title">Our Objectives</h2>
      <div className="objectives-grid">
        {objectives.map((obj, index) => (
          <div className="objective-card" key={index}>
            <div className="objective-icon">{obj.icon}</div>
            <h3 className="objective-title">{obj.title}</h3>
            <p className="objective-desc">{obj.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Objectives;
