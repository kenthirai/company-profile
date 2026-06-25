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
        <div className="clients-header">
          <span className="subtitle">Playmaker !</span>
          <h2>Our Customers<br/>are our biggest fans</h2>
        </div>
        
        <div className="clients-grid">
          <div className="client-logo"><FaMicrosoft /> <span>mandiri sekuritas</span></div>
          <div className="client-logo"><FaSpotify /> <span>amartha</span></div>
          <div className="client-logo"><FaFigma /> <span>paxel</span></div>
          <div className="client-logo"><FaApple /> <span>wahyoo</span></div>
          <div className="client-logo"><SiCisco /> <span>CISCO</span></div>
          <div className="client-logo"><FaAmazon /> <span>Hubble</span></div>
          <div className="client-logo"><FaGoogle /> <span>legoas</span></div>
          <div className="client-logo"><FaGithub /> <span>CBN</span></div>
          <div className="client-logo"><FaSlack /> <span>Ciputra</span></div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
