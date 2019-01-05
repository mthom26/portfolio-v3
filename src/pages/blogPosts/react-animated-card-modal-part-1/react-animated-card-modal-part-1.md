---
title: "Title"
date: ""
slug: "slug"
---

There are plenty of versatile animation libraries for React these days that allow you to implement all sorts of cool animations but sometimes it can be fun to build what you want from scratch. With that in mind we're going to create an animated card modal in React without using any libraries. For a quick peek at the finished project have a look at the [live demo](https://www.google.com) and the [Github repository](https://www.github.com). 

## Setting up the Project

Create a new React project using create-react-app and get rid of the unnecessary boilerplate files (App.css, App.test.js, logo.svg). Replace the code in src/index.css with the following:

```css
/* index.css */
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

Now create a file to hold the gradients and names for each card in src/data.js and fill it with the following code:
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

Now let's start building the App. Add the following code to src/components/App.js:
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
The CardGrid component will render a Card component for each gradient in src/data.js. Create the file src/components/CardGrid.js and add the following code to it:
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
Next create the src/components/Card.js file:
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

First add the modal component to src/components/Modal.js:
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
This component uses React Portals to render something outside the current DOM hierarchy. When mounted this component looks for an element with an id of 'modal' and creates a new 'div' as a child of that element. It then renders any children of this Modal component within that new 'div'. You can learn more about portals from the [React Documentation](https://reactjs.org/docs/portals.html).

The modal needs something to attach to so we need to add the highlighted code to the body tag of public/index.html:
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
Back in the Card add the following code:
```jsx
// src/components/Card.js
import React, { Component, Fragment } from 'react'; // highlight-line
import Modal from './Modal'; // highlight-line

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, primary, secondary } = this.props;
    const { maximised } = this.state; // highlight-line

    return (
      { /* highlight-range{1,8,12-26} */ }
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
          </Modal>
        )}
      </Fragment> 
    )
  }
}

export default Card;
``` 
