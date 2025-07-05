import React, { useState } from 'react';
import '../styles/RecentActivity.css';
import { FaDonate, FaArrowRight, FaUserPlus, FaTree } from 'react-icons/fa';
import { ReactComponent as PlantLogo } from "../assets/PlantLogo.svg";
import Plantation from "../assets/Plantation.jpg";
import { handleRazorpayPayment } from "../utils/payment";
import member1 from '../assets/member1.jpg';
import member2 from '../assets/member2.jpg';
import donor4 from '../assets/donor4.jpg';
import donor2 from '../assets/donor2.jpg';
import donor5 from '../assets/donor5.JPG';
import donor6 from '../assets/donor6.jpeg';


function RecentActivity() {

  const [treeCount, setTreeCount] = useState(1);
  const pricePerTree = 101;

  const increaseTree = () => setTreeCount(treeCount + 1);
  const decreaseTree = () => {
    if (treeCount > 1) setTreeCount(treeCount - 1);
  };

  const handleDonate = () => {
    handleRazorpayPayment({
      amount: treeCount * pricePerTree,
      onSuccess: (response) => {
        console.log("Payment completed:", response);
      },
    });
  };

  const activities = [
    {
      image: Plantation,
      title: 'Planted 100 trees at the Mahaveer Chowk, Chhipitola',
      time: 'April 22, 2023 – 9:00 AM',
    },
  ];
 
  /*const carouselLeft = [
    { image: 'https://t4.ftcdn.net/jpg/03/67/70/91/360_F_367709147_W4Q2pRjMcz7jUkuH4e1BIhmtCDceu3FH.jpg', name: 'Sanjay Jain', post: 'President' },
    { image: 'https://img.freepik.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?semt=ais_hybrid&w=740', name: 'Hiten Jain', post:'Technical team' },
  ];*/
 
  const carouselRight = [
    { image: member1, name: 'Mukesh Kumar Jain', city: 'Agra' },
    { image: member2, name: 'Deepti Jain w/o Ankur Jain', city: 'Agra' },
    { image: donor4, name: 'Sanjay Jain', city: 'Agra' },
    { image: donor2, name: 'Mamta Jain', city: 'Agra' },
    { image: donor5, name: 'Hiten Jain', city: 'Noida' },
    { image: donor6, name: 'Gunmala Jain', city: 'Agra' },
  ];
 
  //const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
 
  //const nextLeft = () => setLeftIndex((leftIndex + 1) % carouselLeft.length)
  const nextRight = () => setRightIndex((rightIndex + 1) % carouselRight.length)

  //const prevLeft = () => setLeftIndex((leftIndex - 1 + carouselLeft.length) % carouselLeft.length)
  const prevRight = () => setRightIndex((rightIndex - 1 + carouselRight.length) % carouselRight.length)


  return (
    <div className="feedback-section">
      <div className="carousel-container">
        {/*<h2 className="carousel-heading">Management Team</h2>
        <div className="carousel">
          <button className="carousel-prev-button" onClick={prevLeft}>{'<'}</button>
          <img src={carouselLeft[leftIndex].image} alt="Left Carousel" />
          <p className="carousel-label1">{carouselLeft[leftIndex].name}</p>
          <p className="carousel-label2">{carouselLeft[leftIndex].post}</p>
          <button className="carousel-next-button" onClick={nextLeft}>{'>'}</button>
        </div>*/}

        <div className="link-box tree-donation-box">
          <PlantLogo style={{ width: 150, height: 150, color: '#0f6e40' }} />
          <h3 className="tree-heading">Plant Trees</h3>

          <div className="tree-counter">
            <button className="tree-btn" onClick={decreaseTree}>–</button>
            <span className="tree-count">{treeCount}</span>
            <button className="tree-btn" onClick={increaseTree}>+</button>
          </div>

          <p className="tree-total">
            Total: ₹{treeCount * pricePerTree}
          </p>

          <button className="tree-donate-btn" onClick={handleDonate}>
            Donate Now <FaArrowRight className="arrow-icon" />
          </button>
        </div>

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
