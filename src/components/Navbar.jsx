import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <div className="logo">
          <h2><span>C</span> coder</h2>
        </div>
        
        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-menu-wrapper ${menuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#work" onClick={() => setMenuOpen(false)}>Work</a></li>
            <li><a href="#service" onClick={() => setMenuOpen(false)}>Service</a></li>
            <li><a href="#customer" onClick={() => setMenuOpen(false)}>Our Customer</a></li>
          </ul>
          <div className="nav-action">
            <a href="#contact" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
