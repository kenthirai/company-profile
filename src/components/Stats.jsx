import React from 'react';
import './Stats.css';

const Stats = () => {
  return (
    <section className="stats">
      <div className="container stats-container">
        <div className="stat-item">
          <h2>190+</h2>
          <p>SATISFIED CUSTOMERS</p>
        </div>
        <div className="stat-item">
          <h2>460+</h2>
          <p>COMPLETED PROJECT</p>
        </div>
        <div className="stat-item">
          <h2>230+</h2>
          <p>WORKERS</p>
        </div>
        <div className="stat-item">
          <h2>50+</h2>
          <p>COMPANY OFFICES</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
