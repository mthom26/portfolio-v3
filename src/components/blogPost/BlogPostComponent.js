import React, { Component } from 'react';

// import './Blog.css';

class BlogPostComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reference } = this.props;
    const { frontmatter, html } = this.props.data.main.edges[0].node;

    return (
      <div ref={reference} id="blog" className="blogPost">
        <h1>{frontmatter.title}</h1>
        <span>{frontmatter.date}</span>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }
}

export default BlogPostComponent;