import React from 'react';
import { FaBullseye, FaEye, FaSpa } from 'react-icons/fa';
import '../styles/AboutUs.css';


function AboutUs() {
  return (
    <div className="about-us">
      <div className="about-header">
        <h1>About Us</h1>
      </div>

      <section className="about-section">
        <div className="about-text">
          <h2>Introduction</h2>
          <p>
            Sarvartha Siddhi Foundation is a dedicated NGO committed to uplifting communities through sustainable development, social welfare, and environmental initiatives. Inspired by principles of compassion and service, we work tirelessly to bring meaningful change in areas like health, education, environment, and community empowerment.
          </p>
        </div>
        <div className="about-icon">
          <FaSpa />
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-icon">
          <FaBullseye />
        </div>
        <div className="about-text">
          <h2>Mission</h2>
          <p>
            To create sustainable solutions that improve lives, protect the environment, and promote social justice. We strive to empower individuals and communities through impactful programs, compassionate outreach, and dedicated service.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Vision</h2>
          <p>
            To build a society where every individual enjoys equal opportunities, a healthy environment, and a dignified life, contributing to the holistic progress of humanity and the planet.
          </p>
        </div>
        <div className="about-icon">
          <FaEye />
        </div>
      </section>
    </div>
  )
}

export default AboutUs;
