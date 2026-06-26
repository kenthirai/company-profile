import React, { useState, useEffect } from 'react';
import './Team.css';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Team = () => {
  const [teamData, setTeamData] = useState(null);

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('/api/content?type=team')
      .then((res) => res.json())
      .then((data) => setTeamData(data))
      .catch(console.error);
      
    fetch('/api/members')
      .then((res) => res.json())
      .then((data) => {
        if(Array.isArray(data)) setTeamMembers(data);
      })
      .catch(console.error);
  }, []);

  const title = teamData?.title || "Meet Our Experts";
  const description = teamData?.description || "Our team of professionals is dedicated to delivering the best results for your business.";

  return (
    <section className="section team">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">OUR TEAM</span>
          <h2 className="section-title">{title}</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>{description}</p>
        </div>
        
        <div className="team-grid">
          {teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <div key={member.id} className="glass-card team-card">
                <div className="team-img">
                  <img src={member.image_url || 'https://via.placeholder.com/400'} alt={member.name} />
                  <div className="team-social">
                    <a href={member.twitter_url || '#'}><FaTwitter /></a>
                    <a href={member.linkedin_url || '#'}><FaLinkedin /></a>
                    <a href={member.github_url || '#'}><FaGithub /></a>
                  </div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="text-gradient">{member.role}</p>
                </div>
              </div>
            ))
          ) : (
            <p style={{textAlign: 'center', width: '100%', color: 'var(--text-muted)'}}>Belum ada anggota tim.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
