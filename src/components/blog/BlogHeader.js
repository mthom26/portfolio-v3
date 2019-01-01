import React from 'react'

import './BlogHeader.css';

class BlogHeader extends React.Component {
  constructor(props) {
    super(props);

    this.fadeRef = React.createRef();

    this.observer = new IntersectionObserver(items => {
      items.forEach(item => {
        item.target.classList.remove('fadeLeft');
        // Only need to remove class once so unobserve ref
        this.observer.unobserve(item.target);
      });
    }, {
      threshold: 0.8
    });
  }

  componentDidMount() {
    this.observer.observe(this.fadeRef.current);
  }

  render() {
    return (
      <div className="blogHeader">
        <div ref={this.fadeRef} className="blogHeaderContent fadeLeft">
            <h1 className="blogHeaderh1">Blog</h1>
             {/* <hr /> */}
            <h2>My Blog</h2>
          </div>
      </div>
    )
  }
}

export default BlogHeader;
