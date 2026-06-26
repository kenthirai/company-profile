import React from 'react';
import './Clients.css';
import { 
  FaMicrosoft, 
  FaApple, 
  FaAmazon, 
  FaGoogle, 
  FaSpotify, 
  FaSlack, 
  FaFigma, 
  FaGithub 
} from 'react-icons/fa';
import { SiCisco } from 'react-icons/si';

const Clients = () => {
  return (
    <section id="customer" className="section clients">
      <div className="container clients-container">
        <div className="section-header">
          <span className="section-subtitle">Playmaker !</span>
          <h2 className="section-title">Our Customers<br/>are our biggest fans</h2>
        </div>
        
        <div className="clients-grid">
          <div className="client-logo glass-card"><FaMicrosoft /> <span>mandiri sekuritas</span></div>
          <div className="client-logo glass-card"><FaSpotify /> <span>amartha</span></div>
          <div className="client-logo glass-card"><FaFigma /> <span>paxel</span></div>
          <div className="client-logo glass-card"><FaApple /> <span>wahyoo</span></div>
          <div className="client-logo glass-card"><SiCisco /> <span>CISCO</span></div>
          <div className="client-logo glass-card"><FaAmazon /> <span>Hubble</span></div>
          <div className="client-logo glass-card"><FaGoogle /> <span>legoas</span></div>
          <div className="client-logo glass-card"><FaGithub /> <span>CBN</span></div>
          <div className="client-logo glass-card"><FaSlack /> <span>Ciputra</span></div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
