import React, { Component } from 'react';
import { Link } from 'gatsby';

import './Blog.css';

class BlogComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reference, data } = this.props;

    return (
      <div ref={reference} id="blog" className="blog">
        {data.allMarkdownRemark.edges.map(post => (
          <div key={post.node.frontmatter.title}>
            <h2>{post.node.frontmatter.title}</h2>
            <span>{post.node.frontmatter.date}</span>
            <Link to={`/blog/${post.node.frontmatter.slug}`}>Read More...</Link>
          </div>
        ))}
      </div>
    )
  }
}

export default BlogComponent;