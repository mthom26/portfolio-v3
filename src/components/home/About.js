import React from 'react';

import './About.css';

import htmlLogo from '../../images/HTML5_Logo.svg';
import cssLogo from '../../images/css3.svg';
import jsLogo from '../../images/logo-javascript.svg';
import mongodbLogo from '../../images/mongodb.svg';
import nodejsLogo from '../../images/nodejs-icon.svg';
import postgresLogo from '../../images/postgresql.svg';
import reactLogo from '../../images/react.svg';
import sassLogo from '../../images/sass-1.svg';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.fadeLeftRef = React.createRef();
    this.fadeRightRef = React.createRef();

    this.observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if(item.intersectionRatio > 0.49) {
          item.target.classList.remove('fade');
          item.target.classList.remove('fade');
          // Only need to remove class once so unobserve ref
          this.observer.unobserve(item.target);
        }
      });
    }, {
      threshold: 0.5
    });
  }
  
  componentDidMount() {
    this.observer.observe(this.fadeLeftRef.current);
    this.observer.observe(this.fadeRightRef.current);
  }

  render() {
    const { reference } = this.props;

    return (
      <div ref={reference} id="about" className="about">
        <div ref={this.fadeLeftRef} className="aboutText fade">
          <h2>About Me</h2>
          <p>I am a full stack web developer and enjoy solving problems and implementing features on both the front and back end of the stack. Specifically I am confident in React and NodeJS.</p>
          <p>I am currently taking on freelance projects from simple one page websites to full stack web applications. If you have a project in mind be sure to get in touch!</p>
        </div>
        <div ref={this.fadeRightRef} className="aboutIcons fade">
          <h2>Skills</h2>
          <div>
            <img src={htmlLogo} className="aboutIconsImage"
              alt="HTML Logo" />
            <img src={cssLogo} className="aboutIconsImage"
              alt="CSS Logo" />
            <img src={jsLogo} className="aboutIconsImage"
              alt="Javascript Logo" />
            <img src={reactLogo} className="aboutIconsImage" 
              alt="ReactJS Logo" />
            <img src={nodejsLogo} className="aboutIconsImage"
              alt="NodeJS Logo" />
            <img src={postgresLogo} className="aboutIconsImage"
              alt="Postgres Logo" />
            <img src={mongodbLogo} className="aboutIconsImage"
              alt="MongoDB Logo" />
            <img src={sassLogo} className="aboutIconsImage" 
              alt="SASS Logo" />
          </div>
        </div>
      </div>
    )
  }
};

export default About;