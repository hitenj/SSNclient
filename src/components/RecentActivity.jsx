import React, { useState } from 'react';
import '../styles/RecentActivity.css';
import { FaDonate, FaArrowRight, FaUserPlus } from 'react-icons/fa';


function RecentActivity() {

  const activities = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStUhhZkHWQwSi91AcZAkx_VCy8F4zFbA4szw&s',
      title: 'Distributed food to 200 families',
      time: 'May 5, 2025 – 10:00 AM',
    },
    {
      image: 'https://www.shutterstock.com/image-photo/delhi-india-june-19-2023-600nw-2370827869.jpg',
      title: 'Organized a blood donation camp',
      time: 'May 3, 2025 – 3:00 PM',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7q7jqFq31AqPqde1-CiQwucAzVXDVYOUgZw&s',
      title: 'Workshop for underprivileged children',
      time: 'April 28, 2025 – 1:00 PM',
    },
    {
      image: 'https://rgipt.ac.in/site/writereaddata/uploadedImages/Image/I_202109101106239571.jpg',
      title: 'Planted 500 trees in the community park',
      time: 'April 22, 2025 – 9:00 AM',
    },
  ];
 
  const carouselLeft = [
    { image: 'https://t4.ftcdn.net/jpg/03/67/70/91/360_F_367709147_W4Q2pRjMcz7jUkuH4e1BIhmtCDceu3FH.jpg', name: 'Sanjay Jain', post: 'President' },
    { image: 'https://img.freepik.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?semt=ais_hybrid&w=740', name: 'Hiten Jain', post:'Technical team' },
  ];
 
  const carouselRight = [
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbERFvfKjB6uTaztESNHP-mrMiI0I4cQ2oNg&s', name: 'Rajeev Sharma', city: 'Agra' },
    { image: 'https://t4.ftcdn.net/jpg/00/70/67/33/360_F_70673337_0wgkTTgozYhKMgBozFHJotukvlJEHzB7.jpg', name: 'Raju Jain', city: 'Ajmer' },
  ];
 
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
 
  const nextLeft = () => setLeftIndex((leftIndex + 1) % carouselLeft.length)
  const nextRight = () => setRightIndex((rightIndex + 1) % carouselRight.length)

  const prevLeft = () => setLeftIndex((leftIndex - 1 + carouselLeft.length) % carouselLeft.length)
  const prevRight = () => setRightIndex((rightIndex - 1 + carouselLeft.length) % carouselRight.length)


  return (
    <div className="feedback-section">
      <div className="carousel-container">
        <h2 className="carousel-heading">Management Team</h2>
        <div className="carousel">
          <button className="carousel-prev-button" onClick={prevLeft}>{'<'}</button>
          <img src={carouselLeft[leftIndex].image} alt="Left Carousel" />
          <p className="carousel-label1">{carouselLeft[leftIndex].name}</p>
          <p className="carousel-label2">{carouselLeft[leftIndex].post}</p>
          <button className="carousel-next-button" onClick={nextLeft}>{'>'}</button>
        </div>

        <a href="/donate" className="link-box">
          <FaDonate className="link-icon" />
          <div className="link-label">
            Donate Now <FaArrowRight className="arrow-icon" />
          </div>
        </a>

      </div>
 
      <div className="activities-container">
        <h2 className="section-title">Recent Activities</h2>
        <div className="activity-scroll">
          {activities.map((activity, index) => (
            <div className="activity-item" key={index}>
              <img src={activity.image} alt="Activity" className="activity-image-vertical" />
              <div className="activity-info">
                <p className="activity-title">{activity.title}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      <div className="carousel-container">
        <h2 className="carousel-heading">Members</h2>
        <div className="carousel">
          <button className="carousel-prev-button" onClick={prevRight}>{'<'}</button>
          <img src={carouselRight[rightIndex].image} alt="Right Carousel" />
          <p className="carousel-label1">{carouselRight[rightIndex].name}</p>
          <p className="carousel-label2">{carouselRight[rightIndex].city}</p>
          <button className="carousel-next-button" onClick={nextRight}>{'>'}</button>
        </div>

        <a href="/apply" className="link-box">
          <FaUserPlus className="link-icon" />
          <div className="link-label">
            Apply as Member <FaArrowRight className="arrow-icon" />
          </div>
        </a>

      </div>
    </div>
  );
};

export default RecentActivity;
