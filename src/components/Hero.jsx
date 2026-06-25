import React from 'react';
import './Hero.css';
import { FaStar, FaCloud, FaLightbulb } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1>We Code<br/>We Deliver</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="hero-actions">
            <a href="#services" className="btn btn-primary">Our services</a>
            <a href="#contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
        
        <div className="hero-features">
          <div className="feature-item">
            <FaStar className="feature-icon" />
            <div className="feature-text">
              <h3>Experience</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <div className="feature-item">
            <FaCloud className="feature-icon" />
            <div className="feature-text">
              <h3>Cloud storage</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <div className="feature-item">
            <FaLightbulb className="feature-icon" />
            <div className="feature-text">
              <h3>Strategy</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
