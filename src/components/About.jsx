import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="work" className="section about">
      <div className="container about-container">
        <div className="about-images">
          <div className="img-grid">
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Work 1" className="img-1" />
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Work 2" className="img-2" />
            <div className="img-group">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Work 3" className="img-3" />
              <div className="orange-block"></div>
            </div>
            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Work 4" className="img-4" />
          </div>
        </div>
        <div className="about-content">
          <span className="subtitle">ABOUT CLIENT</span>
          <h2>Most trusted<br/>Business consulting</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <a href="#read-more" className="btn btn-primary">Read more</a>
        </div>
      </div>
    </section>
  );
};

export default About;
