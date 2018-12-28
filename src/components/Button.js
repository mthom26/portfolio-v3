import React from 'react';
// import ReactGA from 'react-ga';

import './Button.css';

const Button = ({
  text,
  icon,
  link,
  customColor,
  bClickCategory,
  bClickAction
}) => {
  return (
    <a
      href={`${link}`}
      className="buttonBase"
      // onClick={() => {
      //   ReactGA.event({
      //     category: bClickCategory,
      //     action: bClickAction
      //   })
      // }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="button">
        <span style={{ color: customColor }} className="buttonText">
          {text}
        </span>
        <div className="buttonIcon">
          {/* <img src={icon} alt="" /> */}
          {icon(customColor)}
        </div>
      </div>
      <div className="buttonBottom" />
      <div style={{ background: customColor }} className="buttonBottomVar" />
    </a>
  );
};

export default Button;