import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">Our Workspace</span>
          <h2>Gallery</h2>
        </div>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 1" />
          <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 2" />
          <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 3" />
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 4" />
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 5" />
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gallery 6" />
        </div>
      </div>
    </section>
  );
};

export default Gallery;
