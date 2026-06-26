import React, { useState, useEffect } from 'react';
import './Services.css';
import { FaLaptopCode, FaMobileAlt, FaSearchDollar, FaPenNib, FaServer, FaChartLine } from 'react-icons/fa';

const Services = () => {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    fetch('/api/content?type=services')
      .then((res) => res.json())
      .then((data) => setServicesData(data))
      .catch(console.error);
  }, []);

  const title = servicesData?.title || "Our Services";
  const description = servicesData?.description || "We offer a wide range of digital services to help your business grow and succeed in the modern world.";

  return (
    <section id="service" className="section services">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">WHAT WE DO</span>
          <h2 className="section-title">{title}</h2>
          <p style={{color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>{description}</p>
        </div>
        
        <div className="services-grid">
          <div className="glass-card service-card">
            <div className="service-icon-box"><FaLaptopCode /></div>
            <h3>Web Development</h3>
            <p>Custom websites built with modern technologies that are fast, secure, and easy to maintain.</p>
          </div>
          <div className="glass-card service-card">
            <div className="service-icon-box"><FaMobileAlt /></div>
            <h3>App Development</h3>
            <p>Native and cross-platform mobile applications that provide great user experiences.</p>
          </div>
          <div className="glass-card service-card">
            <div className="service-icon-box"><FaSearchDollar /></div>
            <h3>SEO Optimization</h3>
            <p>Improve your search engine rankings and drive more organic traffic to your website.</p>
          </div>
          <div className="glass-card service-card">
            <div className="service-icon-box"><FaPenNib /></div>
            <h3>UI/UX Design</h3>
            <p>Beautiful, intuitive interfaces that keep your users engaged and coming back for more.</p>
          </div>
          <div className="glass-card service-card">
            <div className="service-icon-box"><FaServer /></div>
            <h3>Cloud Hosting</h3>
            <p>Reliable and scalable cloud infrastructure to keep your applications running smoothly.</p>
          </div>
          <div className="glass-card service-card">
            <div className="service-icon-box"><FaChartLine /></div>
            <h3>Digital Marketing</h3>
            <p>Data-driven marketing strategies to increase your online presence and sales.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
