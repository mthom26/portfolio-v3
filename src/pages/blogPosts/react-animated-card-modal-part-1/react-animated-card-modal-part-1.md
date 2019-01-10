---
title: "React Animated Card Modal Part 1"
date: "2019-01-10"
slug: "react-animated-card-modal-part-1"
---

There are plenty of versatile animation libraries for React these days that allow you to implement all sorts of cool animations but sometimes it can be fun to build what you want from scratch. With that in mind we're going to create an animated card modal in React without using any libraries. For a quick peek at the finished project have a look at the [live demo](https://react-animated-card-modal.netlify.com/) and the [Github repository](https://github.com/mthom26/animated-card-modal). 

## Setting up the Project

Create a new React project using create-react-app and get rid of the unnecessary boilerplate files (App.css, App.test.js, logo.svg). Replace the code in *src/index.css* with the following:

```css
/* src/index.css */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ededed;
  background: #232323;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

.container {
  max-width: 980px;
  margin: 0 auto;
}

.cardGrid {
  margin: 5rem 0 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
}

/* CARD */
.card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  border-radius: 10px;
  height: 250px;
}

.card h3 {
  margin: 1rem;
}

.cardHide {
  opacity: 0;
}

/* CARD MODAL */
.modalCard {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 10px;
}

.modalCard h3 {
  margin: 1rem;
}
```

This is all the css we will need for the project, other values will be changed via javascript.

Now  create a file to hold the gradients and names for each card in *src/data.js* and fill it with the following code:
```javascript
// src/data.js
export const gradients = [
  {
    name: 'Disco',
    primary: '#4ecdc4',
    secondary: '#556270'
  },
  {
    name: 'Dania',
    primary: '#7bc6cc',
    secondary: '#be93c5'
  },
  {
    name: 'Jupiter',
    primary: '#ffd89b',
    secondary: '#19547b'
  },
  {
    name: 'Grapefruit',
    primary: '#e96443',
    secondary: '#904e95'
  },
  {
    name: 'Mauve',
    primary: '#a37b9d',
    secondary: '#42275a'
  },
  {
    name: 'Dusk',
    primary: '#fd746c',
    secondary: '#2c3e50'
  }
];
```

I found these at [UI Gradients](https://uigradients.com). It is a great site if you want a few nice gradients quickly.

Now let's start building the App. Add the following code to *src/components/App.js*:
```jsx
// src/components/App.js
import React, { Component } from 'react';
import CardGrid from './CardGrid';
import  { gradients } from '../data';

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>React Animated Card Modal</h1>
        <CardGrid gradients={gradients} />
      </div>
    );
  }
}

export default App;
```
The CardGrid component will render a Card component for each gradient in *src/data.js*. Create the file *src/components/CardGrid.js* and add the following code to it:
```jsx
// src/components/CardGrid.js
import React, { Component } from 'react';

import Card from './Card';

class CardGrid extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { gradients } = this.props;

    return (
      <div className="cardGrid">
        {gradients.map(item => (
          <Card
            key={item.name}
            name={item.name}
            primary={item.primary}
            secondary={item.secondary}
          />
        ))}
      </div>
    );
  }
}

export default CardGrid;
```
Next create the *src/components/Card.js* file:
```jsx
// src/components/Card.js
import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, primary, secondary } = this.props;
    
    return (
        <div
          className="card"
          style={{
            background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
            border: `2px solid ${primary}`
          }}
        >
          <h3 style={{ color: primary }}>{name}</h3>
        </div>
    )
  }
}

export default Card;
```
I added transparency to the primary and secondary colours in the background style, this looks nice and will make it easier to see what is going on later. If you run the app now you should see the six cards rendered with their background gradients.

## Adding the Card Modals

Now it's time to actually start animating. When one of the cards is clicked we want it to expand and fill the screen. I think the easiest way to do this is spawn a modal that looks like an exact copy of the card which then animates to take up the whole screen.

First add the modal component to *src/components/Modal.js*:
```jsx
// src/components/Modal.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('modal');

export class Modal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    root.appendChild(this.el);
  }

  componentWillUnmount() {
    root.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Modal;
```
This component uses React Portals to render something outside the current DOM hierarchy. When mounted this component looks for an element with an id of 'modal' and creates a new `div` as a child of that element. It then renders any children of this Modal component within that new `div`. You can learn more about portals from the [React Portals Documentation](https://reactjs.org/docs/portals.html).

The modal needs something to attach to so add the highlighted code to the body tag of *public/index.html*:
```html
  <!-- Snip -->
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <div id="modal"></div> // highlight-line
    <!-- Snip -->
  </body>
</html>
```
Back in the Card Component add a maximised state and a toggle function to keep track of when the card is clicked. Also a Modal component is added and rendered if the maximised state is set to `true`. The Modal component has a child CardModal component which is just a copy of whatever is in the Card.
```jsx
// src/components/Card.js
import React, { Component, Fragment } from 'react'; // highlight-line
import Modal from './Modal'; // highlight-line
import CardModal from './CardModal'; // highlight-line

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { // highlight-line
      maximised: false // highlight-line
    }; // highlight-line
  }

  toggle = () => { // highlight-line
    this.setState({ maximised: !this.state.maximised }); // highlight-line
  } // highlight-line

  render() {
    const { name, primary, secondary } = this.props;
    const { maximised } = this.state; // highlight-line

    return (
      { /* highlight-range{1,8,12-21} */ }
      <Fragment> 
        <div
          className="card"
          style={{
            background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
            border: `2px solid ${primary}`
          }}
          onClick={this.toggle} 
        >
          <h3 style={{ color: primary }}>{name}</h3>
        </div> 
        {maximised && (
          <Modal>
            <CardModal
              primary={primary}
              secondary={secondary}
              name={name}
            />
          </Modal>
        )}
      </Fragment> 
    )
  }
}

export default Card;
``` 
Create the file *src/components/CardModal.js* and add the code below:
```jsx
// src/components/CardModal.js
import React, { Component } from 'react';

class CardModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { primary, secondary, name } = this.props;
  
    return (
      <div
        className="modalCard"
        style={{
          background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
          border: `2px solid ${primary}`
        }}
      >
        <h3 style={{ color: primary }}>{name}</h3>
      </div>
    )
  }
};

export default CardModal;
```
Clicking on one of the Cards now will spawn a CardModal below the cards so the next thing to do is spawn the CardModal with the correct width, height and screen position. First a reference to the DOM node of the Card component is needed. You can learn more about references from the [React Refs Documentation](https://reactjs.org/docs/refs-and-the-dom.html). Then we can use `getBoundingClientRect()` ([MDN getBoundingClientRect Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)) on this ref to obtain the dimensions.

In the Card component add the highlighted code:
```jsx
// src/components/Card.js
import React, { Component, Fragment } from 'react';
import Modal from './Modal'; 
import CardModal from './CardModal'; 

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      maximised: false, // highlight-line
      dimensions: {} // highlight-line 
    }; 

    this.cardRef = React.createRef(); // highlight-line
  }

  toggle = () => {
    this.setState({ maximised: !this.state.maximised }); 
  }

  { /* highlight-range{1-19} */ }
  measure = () => {
    // Set current dimensions of Card in state
    const rect = this.cardRef.current.getBoundingClientRect();
    const dimensions = {
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width,
      x: rect.x,
      y: rect.y
    };
    this.setState({ dimensions });
  }

  componentDidMount() {
    this.measure();
  }

  render() {
    const { name, primary, secondary } = this.props;
    const { maximised, dimensions } = this.state; // highlight-line
    { /* highlight-range{10,20} */ }
    return (
      <Fragment> 
        <div
          className="card"
          style={{
            background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
            border: `2px solid ${primary}`
          }}
          onClick={this.toggle}
          ref={this.cardRef}
        >
          <h3 style={{ color: primary }}>{name}</h3>
        </div> 
        {maximised && (
          <Modal>
            <CardModal
              primary={primary}
              secondary={secondary}
              name={name}
              dimensions={dimensions} 
            />
          </Modal>
        )}
      </Fragment> 
    )
  }
}

export default Card;
``` 
The `measure()` function is called when the component mounts, calls `getBoundingClientRect()` on the ref created in the constructor and then stores the results in the state. These dimensions are passed to the CardModal component when it mounts.

## Animating the CardModal

In the CardModal we will use the [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) `animate()` function to animate the Card. Add the highlighted code below:
```jsx
// src/components/CardModal.js
import React, { Component } from 'react';

class CardModal extends Component {
  constructor(props) {
    super(props);

    this.cardModalRef = React.createRef(); // highlight-line
  }

  // highlight-start
  componentDidMount() {
    const { dimensions } = this.props;

    const anim = this.cardModalRef.current.animate([
      { // animate from these values (from Card Component dimensions)
        top: `${dimensions.top}px`,
        width: `${dimensions.width}px`,
        left: `${dimensions.left}px`,
        height: `${dimensions.height}px`
      },
      { // ...to these values (full width and height of the screen)
        top: `0px`,
        width: `100%`,
        left: `0px`,
        height: `100%`
      }
    ], { // Object containing timing and other settings for the animation
      duration: 1200, easing: 'ease-in-out', fill: 'forwards'
    });
  }
  // highlight-end
  
  render() {
    const { primary, secondary, name } = this.props;
  
    return (
      <div
        className="modalCard"
        style={{
          background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
          border: `2px solid ${primary}`
        }}
        ref={this.cardModalRef} // highlight-line
      >
        <h3 style={{ color: primary }}>{name}</h3>
      </div>
    )
  }
};

export default CardModal;
```
When the CardModal mounts an animation is created and takes an array with two objects as the first argument. The first object contains the dimensions passed in from the props as the initial values. The second object contains the end values of the animation. The animation also takes an object as it's second argument which contains various settings. Now the CardModal mounts in the correct place (just above the original Card) and animates to take up the full screen when it is clicked.

Next the CardModal should shrink back to the original position when clicked and unmount:
```jsx
// src/components/CardModal.js
import React, { Component } from 'react';

class CardModal extends Component {
  constructor(props) {
    super(props);

    this.cardModalRef = React.createRef();
  }

  componentDidMount() {
    const { dimensions } = this.props;

    const anim = this.cardModalRef.current.animate([
      { // animate from these values (from Card Component dimensions)
        top: `${dimensions.top}px`,
        width: `${dimensions.width}px`,
        left: `${dimensions.left}px`,
        height: `${dimensions.height}px`
      },
      { // ...to these values (full width and height of the screen)
        top: `0px`,
        width: `100%`,
        left: `0px`,
        height: `100%`
      }
    ], { // Object containing timing and other settings for the animation
      duration: 1200, easing: 'ease-in-out', fill: 'forwards'
    });
  }

  // highlight-start
  unmount = () => {
    const { dimensions } = this.props;
    
    const anim = this.cardModalRef.current.animate([
      {
        top: `0px`,
        width: `100%`,
        left: `0px`,
        height: `100%`
      },
      {
        top: `${dimensions.top}px`,
        width: `${dimensions.width}px`,
        left: `${dimensions.left}px`,
        height: `${dimensions.height}px`
      }
    ], { duration: 1200, easing: 'ease-in-out' });
    anim.onfinish = () => {
      // This is the toggle method from Card component which sets maximised to
      // false and unmounts the CardModal
      this.props.unmountAction();
    };
  }

  onModalClick = () => {
    this.unmount();
  }
  // highlight-end

  render() {
    const { primary, secondary, name } = this.props;
  
    return (
      <div
        className="modalCard"
        style={{
          background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
          border: `2px solid ${primary}`
        }}
        ref={this.cardModalRef}
        onClick={this.onModalClick} // highlight-line
      >
        <h3 style={{ color: primary }}>{name}</h3>
      </div>
    )
  }
};

export default CardModal;
```
The `unmount()` function creates a new animation that is the reverse of the mounting animation and adds an `onfinish()` handler ([MDN onfinish Docs](https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish)) to it. When the animation ends this handler calls the unmountAction prop which will toggle the maximised state in the parent Card Component to false and unmount the CardModal. (The unmountAction needs to be passed down from the Card component as shown below):
```jsx
// src/components/Card.js
import React, { Component, Fragment } from 'react';
import Modal from './Modal'; 
import CardModal from './CardModal'; 

class Card extends Component {
  constructor(props) {
    // SNIPPED CODE
  }

  toggle = () => {
    this.setState({ maximised: !this.state.maximised }); 
  }

  measure = () => {
    // SNIPPED CODE
  }

  componentDidMount() {
    this.measure();
  }
  { /* highlight-range{4,9,25} */ }
  render() {
    const { name, primary, secondary } = this.props;
    const { maximised, dimensions } = this.state;
    const classes = maximised ? 'card cardHide' : 'card'; // highlight-line

    return (
      <Fragment> 
        <div
          className={classes} 
          style={{
            background: `linear-gradient(210deg, ${primary}91, ${secondary}91)`,
            border: `2px solid ${primary}`
          }}
          onClick={this.toggle} 
        >
          <h3 style={{ color: primary }}>{name}</h3>
        </div> 
        {maximised && (
          <Modal>
            <CardModal
              primary={primary}
              secondary={secondary}
              name={name}
              dimensions={dimensions}
              unmountAction={this.toggle} 
            />
          </Modal>
        )}
      </Fragment> 
    )
  }
}

export default Card;
``` 
Also note the addition of the conditionally rendered 'cardHide' class on the card. Now when the Card is clicked and maximised is set to 'true' the original Card will disappear as the CardModal begins it's animation. This gives the illusion that it is the same card when clicked.

Now the CardModal mounts and unmounts properly but there are a couple of problems.

* If the user clicks on the CardModal while the animation is playing the CardModal snaps to the full screen size and then plays the unmount animation. Ideally the animation should just shrink from the current size when the user clicks it.

* Secondly when the browser window is resized the Card components will then have incorrect dimensions stored in their state. If the user resizes their browser and clicks on one of the cards it will animate from and to the wrong place.

In Part 2 we will fix both of these problems.