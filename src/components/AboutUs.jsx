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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
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
            Our mission is to promote spiritual growth, compassion, and
            self-discipline through Jain principles. We aim to support the
            community in living a life of peace and truth.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-text">
          <h2>Vision</h2>
          <p>
            We envision a world guided by non-violence, kindness, and ethical
            living, where inner peace and spiritual fulfillment are accessible
            to all.
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
