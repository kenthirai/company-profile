import React from 'react';
import './Team.css';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const Team = () => {
  return (
    <section id="team" className="section team">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle">The Minds Behind</span>
          <h2>Our Team</h2>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-img">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team 1" />
              <div className="team-social">
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div>
            <div className="team-info">
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
          </div>
          <div className="team-card">
            <div className="team-img">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team 2" />
              <div className="team-social">
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div>
            <div className="team-info">
              <h3>Jane Smith</h3>
              <p>Lead Developer</p>
            </div>
          </div>
          <div className="team-card">
            <div className="team-img">
              <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team 3" />
              <div className="team-social">
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div>
            <div className="team-info">
              <h3>Michael Brown</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>
          <div className="team-card">
            <div className="team-img">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Team 4" />
              <div className="team-social">
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaTwitter /></a>
              </div>
            </div>
            <div className="team-info">
              <h3>Sarah Wilson</h3>
              <p>Project Manager</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
