const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js');

    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  title
                  date
                  slug
                }
              }
            }
          }
        }
        `
      ).then(result => {
        if(result.errors) {
          reject(result.errors);
        }

        const blogPosts = result.data.allMarkdownRemark.edges;

        blogPosts.forEach((blogPost, index) => {
          createPage({
            path: `/blog/${blogPost.node.frontmatter.slug}`,
            component: blogPostTemplate,
            context: {
              slug: blogPost.node.frontmatter.slug,
              prevSlug:
                index === 0
                ? blogPosts[blogPosts.length -1].node.frontmatter.slug
                : blogPosts[index-1].node.frontmatter.slug,
              nextSlug:
                index === (blogPosts.length - 1)
                ? blogPosts[0].node.frontmatter.slug
                : blogPosts[index+1].node.frontmatter.slug,
            }
          });
        });
        return;
      })
    )
  })
};