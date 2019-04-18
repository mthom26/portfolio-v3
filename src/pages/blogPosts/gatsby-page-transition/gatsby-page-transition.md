---
title: "Gatsby Page Transitions"
date: "2019-04-18"
slug: "gatsby-page-transitions"
---

I have always liked the idea of animating page transitions. In a typical single page React application it isn't too difficult to implement them, you might just animate each page on mount/unmount as you would any other component. It's a bit harder to do the same using Gatsby because navigating to a new page will trigger a reload. Luckily there are libraries that can take care of this. We will be using [Gatsby Plugin Transition Link](https://transitionlink.tylerbarnes.ca/) (and [AnimeJS](https://animejs.com/) for the actual animations).

We will build a three page website with a static background image. The content for each page will animate in and out when the user changes pages. Here are links to the finished [project]() and [repository]().

## Project Setup

Create a new Gatsby project using the [hello world starter](https://github.com/gatsbyjs/gatsby-starter-hello-world) and install the dependancies we will need:

`npm install gatsby-plugin-transition-link animejs`

Next add a file for each page in *src/pages/*, and a Layout component. The id each page passes to the Layout component is important and will determine the order of the pages:

```jsx
// src/pages/index.js
const Index = () => {
  return (
    <Layout id="page-1">
      <div className="indexPage">
        <h1>Lorem Ipsum</h1>
        <hr />
        <p>Nullam eleifend turpis ac imperdiet efficitur. Curabitur eget tincidunt orci. Phasellus eget condimentum neque. Sed ullamcorper, purus nec consequat lobortis.</p>
      </div>
    </Layout>
  )
};

// src/pages/about.js
const Page2 = () => {
  return (
    <Layout id="page-0">
      <div className="aboutPage">
        <div className="about">
          <div className="content">
            <p>Praesent diam neque, varius a bibendum sit amet, fermentum et libero. Ut quis rutrum est, at cursus justo. In metus diam, luctus non felis a, congue ultricies risus. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla vitae euismod justo, at malesuada turpis. Suspendisse sagittis eleifend nibh quis accumsan. Etiam non ante varius, porta enim sit amet.</p>
            <p>Donec nec ultricies tellus. Aenean sit amet aliquet orci. Ut a nisl velit. Nunc id elit ac purus hendrerit facilisis. Mauris vel facilisis turpis. Sed sapien arcu, congue quis efficitur commodo, accumsan vitae ligula. Vivamus lobortis vel dui at mattis. Duis tincidunt lacinia metus, nec dictum.</p>
          </div>
          <div className="title">
            <h1>About</h1>
            <hr />
          </div>
        </div>
      </div>
    </Layout>
  )
};

// src/pages/contact.js
const Page3 = () => {
  return (
    <Layout id="page-2">
      <div className="contactPage">
        <div className="contact">
          <div className="title">
            <h1>Contact</h1>
            <hr />
          </div>
          <div className="content">
            <p>Donec nec ultricies tellus. Aenean sit amet aliquet orci. Ut a nisl velit. Nunc id elit ac purus hendrerit facilisis. Mauris vel facilisis turpis. Sed sapien arcu, congue quis efficitur commodo, accumsan vitae ligula. Vivamus lobortis vel dui at mattis. Duis tincidunt lacinia metus, nec dictum.</p>
            <p>Praesent diam neque, varius a bibendum sit amet, fermentum et libero. Ut quis rutrum est, at cursus justo. In metus diam, luctus non felis a, congue ultricies risus. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla vitae euismod justo, at malesuada turpis. Suspendisse sagittis eleifend nibh quis accumsan. Etiam non ante varius, porta enim sit amet.</p>
          </div>       
        </div>
      </div>
    </Layout>
  )
};
```

In the Layout component we are using a [TransitionPortal](https://transitionlink.tylerbarnes.ca/docs/transitionportal/). (Don't forget to add the `index.css` for the project from the [repo](https://github.com/mthom26/gatsby-page-transitions/blob/master/src/index.css))

```jsx
// src/components/Layout.js
import React, { Fragment } from 'react';
import { TransitionPortal } from 'gatsby-plugin-transition-link';

import Nav from './Nav';

import '../index.css';

const Layout = ({ children, id }) => {
  return (
    <Fragment>
      <TransitionPortal level="bottom">
        <div className="layoutBackground"></div>
      </TransitionPortal>
      <Nav id={id} />
      <div id={id} className="layout">
        {children}
      </div>
    </Fragment>
  )
};

export default Layout;
```

This Transition Portal usually sits on top of the entering and exiting pages but we want this portal to be beneath our page content so we have to engage in some hackery in our projects css. In `index.css` make sure the code below is present.


```css
/* src/index.css */
/*
  GatsbyJS inserts a div with this id at the top level of the document. Setting 
  the z-index here ensures that the nav and layout components are above the 
  layoutBackground component.
*/ 
body {
  position: relative;
}

#___gatsby {
  position: relative;
  z-index: 1150;
}
```
A div with an id of `___gatsby` is inserted as a child of the document body, this contains our entering/exiting pages. Below the div is a `section` which is inserted by the Transition Portal. We need to make sure the `___gatsby` div appears above the `section` so we change the position to relative and increase the z-index. The parent position also needs to be set to relative for this to take effect (In our case the `body` element).

## Animating Pages

Now we get into actually animating pages. Gatsby Plugin Transition Link provides a couple of different methods to animate pages, we will use [TransitionLink](https://transitionlink.tylerbarnes.ca/docs/transitionlink/). 

```jsx
<TransitionLink
  to="/page"
  exit={{
    length: TRANSITION_LEN,
    trigger: ({ node, e, exit, entry }) => {
      return yourAnimation();
    }
  }}
  entry={{
    delay: TRANSITION_DELAY,
    length: TRANSITION_LEN,
    trigger: ({ node, e, exit, entry }) => {
      return yourAnimation();
    }
  }}
>
  Link
</TransitionLink>
```

The TransitionLink takes a `to` prop (like a regular Gastby Link) and an `exit` and `entry` object. The delay property sets the length of time taken for the animation to start. The trigger property is interesting as it gives us access to the DOM node of the entering/exiting page, the mouse event, and the entry/exit props.

Our links will look like the one below:

```jsx
<TransitionLink
  to="/about"
  id="nav-0"
  className="navLink"
  exit={{
    length: TRANSITION_LEN,
    trigger: ({ node, e, exit, entry }) => {
      // Get the child node so the entire Layout does not animate
      const item = node.querySelector('.layout');
      const animData = getAnimData(e, item);
      // Set the state on the entry so the entering page knows the correct
      // animation data
      entry.state = { animData: animData };
      return getAnim(item, animData, 'exit');
    }
  }}
  entry={{
    delay: TRANSITION_DELAY,
    length: TRANSITION_LEN,
    trigger: ({ node, e, exit, entry }) => {
      // Get the child node so the entire Layout does not animate
      const item = node.querySelector('.layout');
      // Get animation data from state
      const animData = entry.state.animData;
      return getAnim(item, animData, 'entry');
    }
  }}
>
  About
</TransitionLink>
```

In the exit object we get the item with a class of `layout` we want to animate by using the `querySelector()` ([MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)) on the DOM node the trigger function provides. Animating the node directly would animate the entire layout (including the Nav component) which isn't what we want.

Then we call a function `getAnimData(e, item)` which will return an object containing the index of the exiting and entering pages and the animation direction. With access to this object we can decide at runtime what kind of animation to play.

```jsx
const getAnimData = (e, item) => {
  // Returns the desired animation data based on the nav and page numbers
  const navNum = e.target.id.split('-')[1];
  const pageNum = item.id.split('-')[1];
  
  return {
    from: pageNum,
    to: navNum,
    dir: pageNum > navNum ? 'right' : 'left'
  };
};
``` 

The `e` argument is the user mouse event. We are obtaining the id of the Nav link that was clicked, in this case it is the first link `id="nav-0"`, and extracting the number `0`. The `item` argument is the current page which should have an id that looks like `id="page-0"`. Now we can decide which direction the animation should play in based off the current page number and the next page number.

Next we set `entry.state` to an object containing this animData. this passes the data to the entry prop of the TransitionLink.

Finally the `getAnim(item, animData, animType)` function is called where `item` is the DOM node to animate, `animData` is the animation info we found earlier and `animType` is a string of either 'entry' or 'exit'.

```jsx
const getAnim = (item, animData, animType) => {
  // Determine the translateX value of the animation based on animData and
  // whether the animation is an 'entry' or 'exit' for the layout
  let translateValue = [];
  let opacityValue = [];

  if(animType === 'exit') {
    translateValue = animData.dir === 'right'
      ? ['0%', '40%'] // animate from 0% to 40% to the right
      : ['0%', '-40%']; // animate from 0% to 40% to the left
    opacityValue = [1, 0]; // animate from full opacity to zero opacity
  }
  if(animType === 'entry') {
    translateValue = animData.dir === 'right'
      ? ['-40%', '0%'] // animate from 40% to the left to 0%
      : ['40%', '0%']; // animate from 40% to the right to 0%
    opacityValue = [0, 1]; // animate from zero opacity to full opacity
  }

  return animejs.timeline({
    duration: 1200,
    easing: 'easeInOutCubic'
  }).add({
    targets: [item],
    translateX: translateValue,
    opacity: opacityValue
  });
};
```

This returns an [AnimeJS timeline](https://animejs.com/documentation/#timelineBasics) targeting the exiting page and our content will animate out.

The entry object trigger function does the same thing except it obtains it's `animData` from the state `entry.state.animData` and animates the entering page.

Add a TransitionLink for each page and the `Nav.js` component should look like this: 

```jsx
// src/components/Nav.js
import React from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import animejs from 'animejs';

const TRANSITION_DELAY = 1.2;
const TRANSITION_LEN = 1.2;

const getAnimData = (e, item) => {
  // Returns the desired animation data based on the nav and page numbers
  const navNum = e.target.id.split('-')[1];
  const pageNum = item.id.split('-')[1];
  
  return {
    from: pageNum,
    to: navNum,
    dir: pageNum > navNum ? 'right' : 'left'
  };
};

const getAnim = (item, bg, animData, animType) => {
  // Determine the translateX value of the animation based on animData and
  // whether the animation is an 'entry' or 'exit' for the layout
  let translateValue = [];
  let opacityValue = [];

  if(animType === 'exit') {
    translateValue = animData.dir === 'right'
      ? ['0%', '40%']
      : ['0%', '-40%'];
    opacityValue = [1, 0];
  }
  if(animType === 'entry') {
    translateValue = animData.dir === 'right'
      ? ['-40%', '0%']
      : ['40%', '0%'];
    opacityValue = [0, 1];
  }

  return animejs.timeline({
    duration: 1200,
    easing: 'easeInOutCubic'
  }).add({
    targets: [item],
    translateX: translateValue,
    opacity: opacityValue
  });
};

const Nav = ({ id }) => {
  return (
    <nav className="nav">
      <TransitionLink
        to="/about"
        id="nav-0"
        className="navLink"
        exit={{
          length: TRANSITION_LEN,
          trigger: ({ node, e, exit, entry }) => {
            // Get the child node so the entire Layout does not animate
            const item = node.querySelector('.layout');
            const animData = getAnimData(e, item);
            // Set the state on the entry so the entering page knows the correct
            // animation data
            entry.state = { animData: animData };
            return getAnim(item, animData, 'exit');
          }
        }}
        entry={{
          delay: TRANSITION_DELAY,
          length: TRANSITION_LEN,
          trigger: ({ node, e, exit, entry }) => {
            // Get the child node so the entire Layout does not animate
            const item = node.querySelector('.layout');
            // Get animation data from state
            const animData = entry.state.animData;
            return getAnim(item, animData, 'entry');
          }
        }}
      >
        About
      </TransitionLink>
      <TransitionLink
        to="/"
        id="nav-1"
        className="navLink"
        exit={{
          length: TRANSITION_LEN,
          trigger: ({ node, e, exit, entry }) => {
            const item = node.querySelector('.layout');
            const animData = getAnimData(e, item);
            entry.state = { animData: animData };
            return getAnim(item, animData, 'exit');
          }
        }}
        entry={{
          delay: TRANSITION_DELAY,
          length: TRANSITION_LEN,
          trigger: ({ node, e, exit, entry }) => {
            const item = node.querySelector('.layout');
            const animData = entry.state.animData;
            return getAnim(item, animData, 'entry');
          }
        }}
      >
        Home
      </TransitionLink>
      <TransitionLink
        to="/contact"
        id="nav-2"
        className="navLink"
        exit={{
          length: TRANSITION_LEN,
          trigger: ({ node, e, exit, entry }) => {
            const item = node.querySelector('.layout');
            const animData = getAnimData(e, item);
            entry.state = { animData: animData };
            return getAnim(item, animData, 'exit');
          }
        }}
        entry={{
          delay: TRANSITION_DELAY,
          length: TRANSITION_LEN,
          trigger: ({ node, e, exit, entry }) => {
            const item = node.querySelector('.layout');
            const animData = entry.state.animData;
            return getAnim(item, animData, 'entry');
          }
        }}
      >
        Contact
      </TransitionLink>
    </nav>
  )
};

export default Nav;
```

Now we have a basic website with three pages. Clicking a link to the left of the current page will animate to the left and clicking a link to the right of the current page will animate to the right.

## Adding Another Background Layer

Next we will add an animated background gradient to make the transitions more interesting and show that multiple things can be animated. In the Layout component add the following line of code:

```jsx
// src/components/Layout.js
{ /* highlight-range{6} */ }
const Layout = ({ children, id }) => {
  // console.log(`Render: ${id}`);
  return (
    <Fragment>
      <TransitionPortal level="bottom">
        <div id={`layoutBgGradient-${id}`} className="layoutBgGradient"></div>
        <div className="layoutBackground"></div>
      </TransitionPortal>
      <Nav id={id} />
      <div id={id} className="layout">
        {children}
      </div>
    </Fragment>
  )
};
```

If you look at the css for `.layoutBgGradient` you will see that the width is set to `300vw`. The general idea is to have a background that is the number of pages we have multiplied by the viewport width (3 pages is 300vw, 7 pages would be 700vw, etc...). When a new page is selected this background should slide to the corresponding position.

In our Nav component we update each TransitionLink with the code below (don't forget to increment the `-page-NUMBER` in the entry object querySelector for each link):

```jsx
// src/components/Nav.js
{ /* highlight-range{11,15,24,27} */ }
<TransitionLink
  to="/about"
  id="nav-0"
  className="navLink"
  exit={{
    length: TRANSITION_LEN,
    trigger: ({ node, e, exit, entry }) => {
      // Get the child node so the entire Layout does not animate
      const item = node.querySelector('.layout');
      const animData = getAnimData(e, item);
      const bg = document.querySelector(`#layoutBgGradient-${id}`);
      // Set the state on the entry so the entering page knows the correct
      // animation data
      entry.state = { animData: animData };
      return getAnim(item, bg, animData, 'exit');
    }
  }}
  entry={{
    delay: TRANSITION_DELAY,
    length: TRANSITION_LEN,
    trigger: ({ node, e, exit, entry }) => {
      // Get the child node so the entire Layout does not animate
      const item = node.querySelector('.layout');
      const bg = document.querySelector('#layoutBgGradient-page-0');
      // Get animation data from state
      const animData = entry.state.animData;
      return getAnim(item, bg, animData, 'entry');
    }
  }}
>
  About
</TransitionLink>
// Add these changes for the other two links also...
```

Then update our `getAnim()` function:

```jsx
// src/components/Nav.js
{ /* highlight-range{1,20-23,25-30,39-42} */ }
const getAnim = (item, bg, animData, animType) => {
  // Determine the translateX value of the animation based on animData and
  // whether the animation is an 'entry' or 'exit' for the layout
  let translateValue = [];
  let opacityValue = [];

  if(animType === 'exit') {
    translateValue = animData.dir === 'right'
      ? ['0%', '40%']
      : ['0%', '-40%'];
    opacityValue = [1, 0];
  }
  if(animType === 'entry') {
    translateValue = animData.dir === 'right'
      ? ['-40%', '0%']
      : ['40%', '0%'];
    opacityValue = [0, 1];
  }

  // Get animation for the background gradient
  let bgTranslateValue = [];
  const from = `-${animData.from}00vw`;
  const to = `-${animData.to}00vw`;

  if(animType === 'exit') {
    bgTranslateValue = [from, to];
  }
  if(animType === 'entry') {
    bgTranslateValue = [to, to];
  }

  return animejs.timeline({
    duration: 1200,
    easing: 'easeInOutCubic'
  }).add({
    targets: [item],
    translateX: translateValue,
    opacity: opacityValue
  }).add({
    targets: [bg],
    translateX: bgTranslateValue
  }, 0);
};
```

Now each page corresponds to a fraction of this background gradient and moving from a page to any other page results in the background sliding in the same direction as the page content to the proper position for the next page.