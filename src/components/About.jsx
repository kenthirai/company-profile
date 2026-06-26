import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('/api/content?type=about')
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []);

  const defaultSubtitle = "ABOUT US";
  const defaultTitle = "Grow Your Business With Our Creative Digital Ideas";
  const defaultDesc1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const defaultDesc2 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const subtitle = aboutData?.subtitle || defaultSubtitle;
  const title = aboutData?.title || defaultTitle;
  const description1 = aboutData?.description1 || defaultDesc1;
  const description2 = aboutData?.description2 || defaultDesc2;

  return (
    <section id="work" className="section about">
      <div className="container about-container">
        <div className="about-images">
          <div className="img-grid">
            <div className="img-wrapper animate-float">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Team working" className="main-img" />
            </div>
            <div className="img-wrapper secondary animate-float-delayed">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Meeting" className="sub-img" />
              <div className="experience-badge glass-card">
                <h3>10+</h3>
                <p>Years<br/>Experience</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-content">
          <span className="section-subtitle">{subtitle}</span>
          <h2 className="section-title">{title}</h2>
          <div className="about-desc">
            <p className="lead-text">{description1}</p>
            <p>{description2}</p>
          </div>
          <a href="#services" className="btn btn-primary mt-4">Discover More</a>
        </div>
      </div>
    </section>
  );
};

export default About;
