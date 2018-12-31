import React from 'react';
import { Link } from 'gatsby';

import './SideNav.css';

/*-----------------------------------------------------------------------------
  To make SideNav component work with Gatsby I am simply rendering a <Link />
  or a regular <a /> (with smooth scrolling) conditionally based on whether the 
  current page is '/blog' or '/'.
  This is very hacky! SideNav should probably be rebuilt from scratch in the 
  future!
-----------------------------------------------------------------------------*/
const SideNav = ({
  navOpen,
  progress,
  activeLink,
  sectionPositions,
  toggleNav
}) => {
  const blogActive = activeLink === 'blog' ? true : false;
  const classes = navOpen 
    ? "sideNav"
    : "sideNav sideNavHidden";
  const { home, about, portfolio, contact } = sectionPositions;
  
  return (
    <div className={classes}>
      <nav className="navLinks">
        {/* Home Link */}
        {blogActive
          ? (
            <Link
              className={`navLink ${activeLink === 'home' ? 'active': ''}`}
              to="/"
            >
              Home
              <div className="navBarBack">
                <div
                  className={`navBarFront ${activeLink === 'home' ? 'activeBar': ''}`}
                />
              </div>
            </Link>
          ) : (
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
          )
        }
        {/* About Link */}
        {blogActive
          ? (
            <Link
              className={`navLink ${activeLink === 'home' ? 'active': ''}`}
              to="/#about"
            >
              About
              <div className="navBarBack">
                <div
                  className={`navBarFront ${activeLink === 'home' ? 'activeBar': ''}`}
                />
              </div>
            </Link>
          ) : (
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
          )
        }
        {/* Portfolio Link */}
        {blogActive 
          ? (
            <Link
              className={`navLink ${activeLink === 'home' ? 'active': ''}`}
              to="/#portfolio"
            >
              Portfolio
              <div className="navBarBack">
                <div
                  className={`navBarFront ${activeLink === 'home' ? 'activeBar': ''}`}
                />
              </div>
            </Link>
          ) : (
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
          )
        }
        {/* Contact Link */}
        {blogActive
          ? (
            <Link
              className={`navLink ${activeLink === 'home' ? 'active': ''}`}
              to="/#contact"
            >
              Contact
              <div className="navBarBack">
                <div
                  className={`navBarFront ${activeLink === 'home' ? 'activeBar': ''}`}
                />
              </div>
            </Link>
          ) : (
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
          )
        }
        
        <Link
          onClick={(e) => {
            // e.preventDefault();
            toggleNav();
            // window.scrollTo({
            //   top: contact,
            //   behavior: 'smooth'
            // });
          }}
          className={`navLink ${activeLink === 'blog' ? 'active': ''}`}
          to="/blog"
        >
          Blog
          <div className="navBarBack">
            <div
              className={`navBarFront ${activeLink === 'blog' ? 'activeBar': ''}`}
            />
          </div>
        </Link>
      </nav>
      <div style={{height: `${progress}%`}} className="progress" />
    </div>
  )
};

export default SideNav;