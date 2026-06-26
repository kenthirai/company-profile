import React, { useState, useEffect } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState(null);

  useEffect(() => {
    fetch('/api/content?type=gallery')
      .then((res) => res.json())
      .then((data) => setGalleryData(data))
      .catch(console.error);
  }, []);

  const title = galleryData?.title || "Our Latest Work";
  const description = galleryData?.description || "Check out some of our recent projects that showcase our expertise and creativity.";

  return (
    <section className="section gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">PORTFOLIO</span>
          <h2 className="section-title">{title}</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>{description}</p>
        </div>
        
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Project 1" />
            <div className="gallery-overlay">
              <div className="overlay-content">
                <h3>E-Commerce Platform</h3>
                <p>Web Development</p>
              </div>
            </div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Project 2" />
            <div className="gallery-overlay">
              <div className="overlay-content">
                <h3>Corporate Dashboard</h3>
                <p>UI/UX Design</p>
              </div>
            </div>
          </div>
          <div className="gallery-item">
            <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Project 3" />
            <div className="gallery-overlay">
              <div className="overlay-content">
                <h3>Mobile Application</h3>
                <p>App Development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
