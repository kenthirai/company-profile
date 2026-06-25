import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section id="service" className="section services">
      <div className="container services-container">
        <div className="services-info">
          <span className="subtitle">Our services</span>
          <h2>What we do?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <a href="#portfolio" className="btn btn-outline">Portfolio</a>
        </div>
        
        <div className="services-grid">
          <div className="service-card light-dark">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Mobile" />
            <div className="card-content">
              <h3>Mobile application</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <div className="service-card dark">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Coding" />
            <div className="card-content">
              <h3>Coding</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <div className="service-card dark">
            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="UI Design" />
            <div className="card-content orange-bg">
              <h3>UI design</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <div className="service-card light-dark">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Web App" />
            <div className="card-content">
              <h3>Web application</h3>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
