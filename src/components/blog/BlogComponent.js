import React, { Component } from 'react';

import './Blog.css';

class BlogComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reference, data } = this.props;

    return (
      <div ref={reference} id="blog" className="blog">
        <h1>Blog</h1>
        {data.allMarkdownRemark.edges.map(post => (
          <div key={post.node.frontmatter.title}>
            <h2>{post.node.frontmatter.title}</h2>
            <span>{post.node.frontmatter.date}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default BlogComponent;