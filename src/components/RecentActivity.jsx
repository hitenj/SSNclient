import React, { useState } from 'react';
import '../styles/RecentActivity.css';
import { FaDonate, FaArrowRight, FaUserPlus, FaTree } from 'react-icons/fa';


function RecentActivity() {

  const [treeCount, setTreeCount] = useState(1);
  const pricePerTree = 101;

  const increaseTree = () => setTreeCount(treeCount + 1);
  const decreaseTree = () => {
    if (treeCount > 1) setTreeCount(treeCount - 1);
  };

  const handleDonate = () => {
    alert(`Thank you for donating ₹${treeCount * pricePerTree} to plant ${treeCount} tree(s)!`);
    // Optionally redirect to payment page here
  };

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
 
  /*const carouselLeft = [
    { image: 'https://t4.ftcdn.net/jpg/03/67/70/91/360_F_367709147_W4Q2pRjMcz7jUkuH4e1BIhmtCDceu3FH.jpg', name: 'Sanjay Jain', post: 'President' },
    { image: 'https://img.freepik.com/free-photo/indian-man-smiling-mockup-psd-cheerful-expression-closeup-portra_53876-143269.jpg?semt=ais_hybrid&w=740', name: 'Hiten Jain', post:'Technical team' },
  ];*/
 
  const carouselRight = [
    { image: 'https://st4.depositphotos.com/9998432/24360/v/450/depositphotos_243600690-stock-illustration-person-gray-photo-placeholder-girl.jpg', name: 'Gunmala Jain', city: 'Agra' },
    { image: 'https://st4.depositphotos.com/9998432/22597/v/600/depositphotos_225976914-stock-illustration-person-gray-photo-placeholder-man.jpg', name: 'Rajesh Jain', city: 'Agra' },
  ];
 
  const [leftIndex, setLeftIndex] = useState(0);
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
          <FaTree className="link-icon tree-icon" />
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
