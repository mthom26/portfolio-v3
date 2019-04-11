---
title: "Gatsby Page Transition"
date: "2019-04-11"
slug: "gatsby-page-transition"
---

Page transitions are pretty cool. In a typical single page React application it isn't too difficult to implement them, you might just animate each page as you would any other component. It's a bit harder to do the same using Gatsby because navigating to a new page will trigger a reload. Luckily there are libraries that can take care of this. We will be using [Gatsby Plugin Transition Link](https://transitionlink.tylerbarnes.ca/) and [AnimeJS](https://animejs.com/). Here are links to the finished [project]() and [repository]().

## Project Setup

Create a new Gatsby project using the [hello world starter](https://github.com/gatsbyjs/gatsby-starter-hello-world) and install the dependancies we will need: `npm install gatsby-plugin-transition-link animejs`.