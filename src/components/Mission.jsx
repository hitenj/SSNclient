import React from 'react';
import {FaHandsHelping} from 'react-icons/fa';
import '../styles/Mission.css';

function Mission() {
  return (
    <div className="mission-section">
      <div className="mission-text">
        <h2>OUR MISSION</h2>
        <ul>
        <li>
          To cultivate compassion and kindness towards all beings, embracing Jainism’s principle of Ahimsa (non-violence).
        </li>
        <li>
          To empower communities through the principles of equality and respect.
        </li>
        <li>
          To create a sustainable future, nurturing our environment by following our teachings of environmental stewardship.
        </li>
        </ul>
        <a href='/about' className='read-more-btn'>Read More</a>
      </div>
      <div className="mission-icon">
        <FaHandsHelping />
      </div>
    </div>
  )
}

export default Mission;
