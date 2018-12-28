import React from 'react';

import './NavButton.css';

const NavButton = ({ toggleNav, navOpen }) => {
  const openClass = navOpen
    ? "open"
    : "";

  return (
    <div onClick={toggleNav} className={`navButton ${openClass}`}>
      <div className={`line one ${openClass}`}></div>
      <div className={`line two ${openClass}`}></div>
      <div className={`line three ${openClass}`}></div>
    </div>
  )
};

export default NavButton;