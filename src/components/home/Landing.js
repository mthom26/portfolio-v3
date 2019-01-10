import React from 'react';

import './Landing.css';

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.fadeRef = React.createRef();
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(items => {
      items.forEach(item => {
        item.target.classList.remove('fadeLeft');
        // Only need to remove class once so unobserve ref
        this.observer.unobserve(item.target);
      });
    }, {
      threshold: 0.8
    });
    
    this.observer.observe(this.fadeRef.current);
  }

  render() {
    const { reference } = this.props;

    return (
      <div id="home" ref={reference} className="landing">
        <div ref={this.fadeRef} className="landingContent fadeLeft">
          <h1 className="landingh1">
            Michael <span className="landingColored">Thompson</span>
          </h1>
          <h2>Bespoke Web Development</h2>
        </div>
      </div>
    )
  }
};

export default Landing;