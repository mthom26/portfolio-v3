import React from 'react';

import './SideNav.css';

const SideNav = ({
  navOpen,
  progress,
  activeLink,
  sectionPositions,
  toggleNav
}) => {
  const classes = navOpen 
    ? "sideNav"
    : "sideNav sideNavHidden";
  const { home, about, portfolio, contact } = sectionPositions;
  
  return (
    <div className={classes}>
      <nav className="navLinks">
        <a
          onClick={(e) => {
            e.preventDefault();
            toggleNav();
            window.scrollTo({
              top: home,
              behavior: 'smooth'
            });
          }}
          className={`navLink ${activeLink === 'home' ? 'active': ''}`}
          href="#home"
        >
          Home
          <div className="navBarBack">
            <div
              className={`navBarFront ${activeLink === 'home' ? 'activeBar': ''}`}
            />
          </div>
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            toggleNav();
            window.scrollTo({
              top: about,
              behavior: 'smooth'
            });
          }}
          className={`navLink ${activeLink === 'about' ? 'active': ''}`}
          href="#about"
        >
          About
          <div className="navBarBack">
            <div
              className={`navBarFront ${activeLink === 'about' ? 'activeBar': ''}`}
            />
          </div>
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            toggleNav();
            window.scrollTo({
              top: portfolio,
              behavior: 'smooth'
            });
          }}
          className={`navLink ${activeLink === 'portfolio' ? 'active': ''}`}
          href="#portfolio"
        >
          Portfolio
          <div className="navBarBack">
            <div
              className={`navBarFront ${activeLink === 'portfolio' ? 'activeBar': ''}`}
            />
          </div>
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            toggleNav();
            window.scrollTo({
              top: contact,
              behavior: 'smooth'
            });
          }}
          className={`navLink ${activeLink === 'contact' ? 'active': ''}`}
          href="#contact"
        >
          Contact
          <div className="navBarBack">
            <div
              className={`navBarFront ${activeLink === 'contact' ? 'activeBar': ''}`}
            />
          </div>
        </a>
      </nav>
      <div style={{height: `${progress}%`}} className="progress" />
    </div>
  )
};

export default SideNav;