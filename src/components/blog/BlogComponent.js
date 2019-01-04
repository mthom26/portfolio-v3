import React, { Component } from 'react';
import { Link } from 'gatsby';

import './Blog.css';

// import chevronLogo from '../../images/chevron-right.svg';
import { chevronRight } from '../../utils/icons';

class BlogComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reference, data } = this.props;

    return (
      <div ref={reference} id="blog" className="blog">
        {data.allMarkdownRemark.edges.map(post => (
          <Link
            key={post.node.frontmatter.title}
            to={`/blog/${post.node.frontmatter.slug}`}
            className="blogPostItem"
          >
            <div className="blogPostItemContent">
              <div className="blogPostItemFrontmatter">
                <h2>{post.node.frontmatter.title}</h2>
                <span>{post.node.frontmatter.date}</span>
              </div>
              <p>{post.node.excerpt}</p>
            </div>
            <div className="blogPostItemIcon">
              {/* <img src={chevronLogo} height="48px" /> */}
              {chevronRight('#e29865')}
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

export default BlogComponent;