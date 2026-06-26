import React, { useState, useEffect } from 'react';
import './Stats.css';

const Stats = () => {
  const [statsData, setStatsData] = useState(null);

  useEffect(() => {
    fetch('/api/content?type=stats')
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch(console.error);
  }, []);

  const customers = statsData?.customers || "190+";
  const projects = statsData?.projects || "250+";
  const workers = statsData?.workers || "50+";
  const offices = statsData?.offices || "10+";

  return (
    <section className="stats">
      <div className="stats-overlay"></div>
      <div className="container stats-container relative-z">
        <div className="glass-card stat-card">
          <h2 className="text-gradient">{customers}</h2>
          <p>SATISFIED CUSTOMERS</p>
        </div>
        <div className="glass-card stat-card">
          <h2 className="text-gradient">{projects}</h2>
          <p>COMPLETED PROJECTS</p>
        </div>
        <div className="glass-card stat-card">
          <h2 className="text-gradient">{workers}</h2>
          <p>WORKERS EMPLOYED</p>
        </div>
        <div className="glass-card stat-card">
          <h2 className="text-gradient">{offices}</h2>
          <p>COMPANY OFFICES</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
