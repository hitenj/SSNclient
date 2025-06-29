import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Gallery.css';
import Plantation from "../assets/Plantation.jpg";

const images = [
  Plantation,
'https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg',
'https://media.istockphoto.com/id/1392742688/photo/back-view-shot-of-group-of-teenager-kids-in-unifrom-going-home-from-school-after-classes.jpg?s=612x612&w=0&k=20&c=whX20fiwkY9qsjh7_fbCylf86fCwD-pYTs2T91imNks=',
];

function Gallery() {

    const [index, setIndex] = useState(0);
    const prev = () => setIndex((index - 1 + images.length) % images.length);
    const next = () => setIndex((index + 1) % images.length);

  return (
    <div className="gallery-section">
      <h2 className="gallery-title">Gallery</h2>
      <div className="gallery-slider">
        <button className="arrow left" onClick={prev}><FaArrowLeft /></button>
        <img src={images[index]} alt="Gallery" className="gallery-image" />
        <button className="arrow right" onClick={next}><FaArrowRight /></button>
      </div>
      <div className="gallery-dots">
        {images.map((_, i) => (
          <span key={i} className={`dot ${i === index ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default Gallery;
