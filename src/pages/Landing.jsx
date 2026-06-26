import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Team from '../components/Team';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Gallery />
      <Team />
      <Clients />
      <Footer />
    </>
  );
};

export default Landing;
