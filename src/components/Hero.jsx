import React, { useState, useEffect } from 'react';
import './Hero.css';
import { FaStar, FaCloud, FaLightbulb } from 'react-icons/fa';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    fetch('/api/content?type=hero')
      .then((res) => res.json())
      .then((data) => setHeroData(data))
      .catch(console.error);
  }, []);

  const defaultTitle = "We Code<br />We Deliver";
  const defaultSubtitle = "We are a digital agency specializing in web development, design, and digital marketing. We help businesses grow online.";
  const title = heroData?.title || defaultTitle;
  const subtitle = heroData?.subtitle || defaultSubtitle;

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content animate-fade-in">
          <h1 dangerouslySetInnerHTML={{ __html: title }} className="text-gradient"></h1>
          <p>{subtitle}</p>
          <div className="hero-actions">
            <a href="#work" className="btn btn-primary">Our Work</a>
            <a href="#contact" className="btn btn-secondary">Contact Us</a>
          </div>
        </div>
        <div className="hero-features animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="glass-card feature-card">
            <div className="feature-icon"><FaStar /></div>
            <div className="feature-text">
              <h3>Premium Quality</h3>
              <p>Top tier standards</p>
            </div>
          </div>
          <div className="glass-card feature-card">
            <div className="feature-icon"><FaCloud /></div>
            <div className="feature-text">
              <h3>Cloud Solutions</h3>
              <p>Scalable architecture</p>
            </div>
          </div>
          <div className="glass-card feature-card">
            <div className="feature-icon"><FaLightbulb /></div>
            <div className="feature-text">
              <h3>Creative Ideas</h3>
              <p>Innovative designs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
