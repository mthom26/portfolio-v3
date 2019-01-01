---
title: "Second Post"
date: "2018-12-29"
slug: "second-post"
---

Cras molestie justo ac pellentesque rutrum. Vivamus vulputate mattis aliquet.<!-- end --> Vivamus consectetur, ligula a rhoncus consectetur, elit erat mattis elit, et aliquam neque nunc a risus. Etiam blandit mollis sapien, et molestie urna faucibus id. Maecenas ut neque ac leo pretium volutpat porttitor nec libero. Praesent cursus.

```jsx
<div ref={reference} id="blog" className="blog">
  {data.allMarkdownRemark.edges.map(post => (
    <Link
      key={post.node.frontmatter.title}
      to={`/blog/${post.node.frontmatter.slug}`}
      className="blogPostItem"
    >
      <div className="blogPostContent">
        <div className="blogPostFrontmatter">
          <h2>{post.node.frontmatter.title}</h2>
          <span>{post.node.frontmatter.date}</span>
        </div>
        <p>{post.node.excerpt}</p>
      </div>
      <div className="blogPostIcon">
        <img src={chevronLogo} height="48px" />
      </div>
    </Link>
  ))}
</div>
```

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi quis varius neque. Nam eu pellentesque eros, quis tristique dolor. Vivamus consectetur, elit ac consectetur auctor, lacus est sollicitudin nunc, vitae scelerisque tellus purus non purus.[Test Link](https://www.google.com) Pellentesque habitant morbi tristique senectus et netus et malesuada fames.

```javascript
const arr = [0, 3, 5, 4, 1, 2, 7, 9];

const filtered = arr.filter(item => (
  item < 4
));

console.log(filtered);
```