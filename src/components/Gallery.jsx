import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Gallery.css';

const images = [
'https://images.pexels.com/photos/3079978/pexels-photo-3079978.jpeg?cs=srgb&dl=pexels-ritesh-arya-1423700-3079978.jpg&fm=jpg',
'https://media.istockphoto.com/id/1392742688/photo/back-view-shot-of-group-of-teenager-kids-in-unifrom-going-home-from-school-after-classes.jpg?s=612x612&w=0&k=20&c=whX20fiwkY9qsjh7_fbCylf86fCwD-pYTs2T91imNks=',
'https://media.istockphoto.com/id/512710622/video/primary-school-students-with-teacher-in-class-using-laptops-outdoor.jpg?s=640x640&k=20&c=z_xW0h6_wT_PiBlFKcfJ_WRZfkrQwOhh0Apfx6KcbCU=',
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
