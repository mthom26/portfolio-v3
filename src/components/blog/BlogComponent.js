import React from 'react';
import { Link } from 'gatsby';

import './Blog.css';

import { chevronRight } from '../../utils/icons';

const BlogComponent = ({ reference, data }) => {
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
            {chevronRight('#e29865')}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogComponent;