import React, { Component } from 'react';
import { Link } from 'gatsby';

import './BlogPost.css';

class BlogPostComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reference } = this.props;
    const {
      frontmatter: { title, date },
      html
    } = this.props.data.main.edges[0].node;
    const {
      title: prevTitle,
      date: prevDate,
      slug: prevSlug
    } = this.props.data.prev.edges[0].node.frontmatter;
    const {
      title: nextTitle,
      date: nextDate,
      slug: nextSlug
    } = this.props.data.next.edges[0].node.frontmatter;

    return (
      <div ref={reference} id="blog" className="blogPostContainer">
        <div className="blogPost">
          <div className="blogPostTitle">
            <h1>{title}</h1>
            <span>{date}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <div className="blogPostFooter">
            <Link to={`/blog/${prevSlug}`} className="blogPostPrev">
              <h3>{prevTitle}</h3>
              <span>{prevDate}</span>
              <div className="bottomBar" />
            </Link>
            <Link to={`/blog/${nextSlug}`} className="blogPostNext">
              <h3>{nextTitle}</h3>
              <span>{nextDate}</span>
              <div className="bottomBar" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogPostComponent;