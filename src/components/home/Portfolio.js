import React from 'react';

import './Portfolio.css';
import Project from './Project';

import autoRepairImage from '../../images/autobodyrepairdark.jpg';
import restaurantImage from '../../images/projectrestaurantdark.jpg';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);

    this.fadeRefOne = React.createRef();
    this.fadeRightRefOne = React.createRef();
    this.fadeRefTwo = React.createRef();
    this.fadeRightRefTwo = React.createRef();

    this.observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if(item.intersectionRatio > 0.49) {
          item.target.classList.remove('fade');
          item.target.classList.remove('fadeRight');
          // Only need to remove class once so unobserve ref
          this.observer.unobserve(item.target);
        }
      });
    }, {
      threshold: 0.5
    });
  }

  componentDidMount() {
    this.observer.observe(this.fadeRefOne.current);
    this.observer.observe(this.fadeRightRefOne.current);
    this.observer.observe(this.fadeRefTwo.current);
    this.observer.observe(this.fadeRightRefTwo.current);
  }

  render() {
    const { reference } = this.props;

    return (
      <div ref={reference} id="portfolio" className="portfolio">
        <Project
          imageRef={this.fadeRefOne}
          contentRef={this.fadeRightRefOne}
          image={autoRepairImage}
          linkAddress="https://autobodyrepairs.now.sh/"
          gitHubAddress="https://github.com/mthom26/car-body-repair"
          customColor="#d24a43"
          projectName="Auto Body Repairs"
        >
          <h3>Auto Body Repairs</h3>
          <p>This is a single page website built GatsbyJS static site generator. It includes eye catching animations and google maps integration.</p>
        </Project>
        <Project
          imageRef={this.fadeRefTwo}
          contentRef={this.fadeRightRefTwo}
          image={restaurantImage}
          linkAddress="https://gatsbyrestaurant.netlify.com/"
          gitHubAddress="https://github.com/mthom26/gatsby-restaurant-v2"
          customColor="#e2d565"
          projectName="Good Eating"
        >
          <h3>Good Eating</h3>
          <p>A multi page website built using GatsbyJS including lazy loaded images, google maps and a contact form.</p>
        </Project>
      </div>
    )
  }
};

export default Portfolio;