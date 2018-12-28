import React, { Component } from 'react';
import 'intersection-observer';
// import ReactGA from 'react-ga';

import '../reboot.css';
import '../index.css';

import SideNav from '../components/SideNav';
import Landing from '../components/home/Landing';
import About from '../components/home/About';
import Portfolio from '../components/home/Portfolio';
import Contact from '../components/home/Contact';
import NavButton from '../components/NavButton';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false,
      progress: 0,
      intersectionAmount: {
        home: 0,
        about: 0,
        portfolio: 0,
        contact: 0
      },
      activeLink: "",
      sectionPositions: {
        home: 0,
        about: 0,
        portfolio: 0,
        contact: 0
      },
      getSectionPositions: true
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    // Create refs for each section
    this.rootRef = React.createRef();
    this.homeRef = React.createRef();
    this.aboutRef = React.createRef();
    this.portfolioRef = React.createRef();
    this.contactRef = React.createRef();

    this.observer = new IntersectionObserver(items => {
      /*-----------------------------------------------------------------------
        intersectionAmount is updated when the user scrolls and determines 
        which nav link should be highlighted. sectionPositions records the 
        position of each section to pass to SideNav for smooth scrolling. 
        Currently sectionPosition only works on load/refresh so resizing window 
        vertically results in incorrect values. 
      -----------------------------------------------------------------------*/
      let {
        intersectionAmount,
        sectionPositions,
        getSectionPositions
      } = this.state; 
      
      items.forEach(item => {
        intersectionAmount[item.target.id] = item.intersectionRatio;
        if(getSectionPositions){
          sectionPositions[item.target.id] = item.target.offsetTop;
        }
      });
      
      // Find item with highest visibility
      const activeLink = Object.keys(intersectionAmount).reduce((acc, cur) => {
        return intersectionAmount[acc] > intersectionAmount[cur] ? acc : cur
      });

      // Save new state
      this.setState({
        intersectionAmount,
        sectionPositions,
        activeLink,
        getSectionPositions: false
      });
    }, {
      root: this.rootRef.current,
      threshold: new Array(11).fill(0).map((v, i) => i * 0.1)
    })
  }

  componentDidMount() {
    // ReactGA.initialize('UA-107308251-4');
    // ReactGA.pageview('/');
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.observer.observe(this.homeRef.current);
    this.observer.observe(this.aboutRef.current);
    this.observer.observe(this.portfolioRef.current);
    this.observer.observe(this.contactRef.current);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentScroll = document.scrollingElement.scrollTop;
    const maxScroll = document.scrollingElement.scrollHeight - window.innerHeight;
    const scrollPercent = (currentScroll / maxScroll) * 100;
    this.setState({ progress: scrollPercent });
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  render() {
    const { navOpen, progress, activeLink, sectionPositions } = this.state;

    return (
      <div className="app">
        <SideNav
          navOpen={navOpen}
          progress={progress}
          activeLink={activeLink}
          sectionPositions={sectionPositions}
          toggleNav={this.toggleNav}
        />
        <NavButton
          navOpen={navOpen}
          toggleNav={this.toggleNav}
        />
        <div ref={this.rootRef} className="main">
          <Landing reference={this.homeRef} />
          <About reference={this.aboutRef} />
          <Portfolio reference={this.portfolioRef} />
          <Contact reference={this.contactRef} />
        </div>
      </div>
    );
  }
};

export default Index;
