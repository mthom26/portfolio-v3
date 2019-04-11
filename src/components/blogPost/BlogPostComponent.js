import React from 'react';
import { Link } from 'gatsby';

import './BlogPost.css';

import { chevronLeft, chevronRight } from '../../utils/icons'; 

const BlogPostComponent = ({ reference, data })  => {
  const {
    frontmatter: { title, date },
    html
  } = data.main.edges[0].node;
  const {
    title: prevTitle,
    date: prevDate,
    slug: prevSlug
  } = data.prev.edges[0].node.frontmatter;
  const {
    title: nextTitle,
    date: nextDate,
    slug: nextSlug
  } = data.next.edges[0].node.frontmatter;

  return (
    <div ref={reference} id="blog" className="blogPostContainer">
      <div className="blogPost">
        <div className="blogPostTitle">
          <h1>{title}</h1>
          <span>{date}</span>
          <hr className="blogPostRuler" />
        </div>
        <div className="blogPostContent" dangerouslySetInnerHTML={{ __html: html }} />
        <hr className="blogPostRuler" />
        <div className="blogPostFooter">
          <Link to={`/blog/${prevSlug}`} className="blogPostPrev">
            <div className="blogPostPrevIcon">
              {chevronLeft('#e29865')}
            </div>
            <div className="blogPostPrevContent">
              <h3>{prevTitle}</h3>
              <span>{prevDate}</span>
            </div>
            
          </Link>
          <Link to={`/blog/${nextSlug}`} className="blogPostNext">
            <div className="blogPostNextContent">
              <h3>{nextTitle}</h3>
              <span>{nextDate}</span>
            </div>
            <div className="blogPostNextIcon">
              {chevronRight('#e29865')}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostComponent;