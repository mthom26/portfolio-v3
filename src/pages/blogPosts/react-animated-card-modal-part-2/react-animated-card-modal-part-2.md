---
title: "React Animated Card Modal Part 2"
date: "2019-01-17"
slug: "react-animated-card-modal-part-2"
---

In part 1 we created a CardModal which expands to full screen size when clicked. However there are a couple of rough edges:

When the browser window is resized the Card components will then have incorrect dimensions stored in their state. If the user resizes their browser and clicks on one of the cards it will animate from and to the wrong place.

If the user clicks on the CardModal while the animation is playing the CardModal snaps to the full screen size and then plays the unmount animation. Ideally the animation should just shrink from the current size as the user clicks it.

## Handling Window Resizing

In the Card component there is a `measure()` function which obtains the current dimensions of the DOM node it is called on and sets them in the Card state. Currently this function is only called when the component mounts so each Card is stuck with whatever dimensions it receives when the browser is refreshed.

In *src/components/Card.js* add the highlighted code below:
```jsx
// src/components/Card.js
import React, { Component, Fragment } from 'react';
import Modal from './Modal'; 
import CardModal from './CardModal'; 

class Card extends Component {
  constructor(props) {
    // SNIPPED CODE
  }
  { /* highlight-range{2-7} */ }
  toggle = () => {
    // Set state with new measurements every time a Card is clicked
    const dimensions = this.measure();
    this.setState({
      maximised: !this.state.maximised,
      dimensions
    });
  }
  { /* highlight-range{2,3,14} */ }
  measure = () => {
    // Return current dimensions of Card
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
    return dimensions; 
  }

  componentDidMount() {
    this.setState({ dimensions: this.measure() }); // highlight-line
  }
  
  render() {
    const { name, primary, secondary } = this.props;
    const { maximised, dimensions } = this.state;
    const classes = maximised ? 'card cardHide' : 'card'; 

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
The measure function is changed to return the dimensions instead of setting state directly. This measure function is then run whenever a Card is clicked so the correct dimensions will be passed to the CardModal even if the window is resized beforehand. Now if the user resizes the window the CardModal will expand from and to the correct size.

However there is one small edge case. If the user expands the CardModal and then resizes the window the CardModal still contains the old dimensions and when it is unmounted it will shrink to the wrong place.

In *src/components/CardModal.js* add the highlighted line below:
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

  unmount = () => {
    const dimensions = this.props.measureAction(); // highlight-line
    
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
        onClick={this.onModalClick}
      >
        <h3 style={{ color: primary }}>{name}</h3>
      </div>
    )
  }
};

export default CardModal;
```
And in *src/components/Card.js* add:
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
    // Set state with new measurements every time a Card is clicked
    const dimensions = this.measure();
    this.setState({
      maximised: !this.state.maximised,
      dimensions
    });
  }

  // highlight-start
  toggleMaxFalse = () => {
    this.setState({ maximised: false });
  }
  // highlight-end

  measure = () => {
    // Return current dimensions of Card
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
    return dimensions;
  }

  componentDidMount() {
    this.setState({ dimensions: this.measure() }); 
  }
  
  render() {
    const { name, primary, secondary } = this.props;
    const { maximised, dimensions } = this.state;
    const classes = maximised ? 'card cardHide' : 'card'; 
    { /* highlight-range{20,21} */ }
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
              unmountAction={this.toggleMaxFalse}
              measureAction={this.measure}
            />
          </Modal>
        )}
      </Fragment> 
    )
  }
}

export default Card;
```
Now the `measure()` function is passed to the CardModal and is run when the user clicks on the CardModal so the correct dimensions are obtained before the CardModal aimates and unmounts.

The `toggleMaxFalse()` function is added and simply sets the maximised state to false for the Card component. This is passed as the `unmountAction` prop to the CardModal instead of `toggle()` so when the CardModal finishes it's animation it just unmounts without calling the `measure()` function again if it were to use `toggle()`.

## Handling User Interaction During Animation

The CardModal has three states of animation. When the user first clicks the Card it is `OPENING`. When this animation finishes it is `IDLE` and when the user clicks again the CardModal begins the unmounting animation, here it is `CLOSING`. The list below shows how clicking during these phases should be handled: 
* If the user clicks on the CardModal during `OPENING` the animation should reverse from it's current point and then unmount.
* If the user clicks on the CardModal during `IDLE` nothing special happens, the CardModal simply plays the unmount animation as before.
* If the user clicks on the CardModal during `CLOSING` the CardModal should ignore the click and simply finish the unmount animation and unmount.

In *src/components/CardModal.js* add the highlighted code below:
```jsx
// src/components/CardModal.js
import React, { Component } from 'react';

class CardModal extends Component {
  constructor(props) {
    super(props);

    this.state = { // highlight-line
      playing: 'IDLE' // highlight-line
    }; // highlight-line

    this.cardModalRef = React.createRef();
  }

  componentDidMount() {
    const { dimensions } = this.props;
    this.setState({ playing: 'OPENING' }); // highlight-line

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
    // highlight-start
    anim.onfinish = () => {
      this.setState({ playing: 'IDLE' });
    }

    // Store animation for later use (when user interrupts animation)
    this.anim = anim;
    // highlight-end
  }

  unmount = () => {
    const dimensions = this.props.measureAction();
    this.setState({ playing: 'CLOSING' }); // highlight-line
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
    // highlight-start
    // Check the current animation state of the modal and update animation
    if(this.state.playing === 'OPENING') {
      this.setState({ playing: 'CLOSING' });
      // reverse the animation
      this.anim.reverse();
      // change the onfinish to unmountAction
      this.anim.onfinish = () => {
        this.props.unmountAction();
      };
    } else if(this.state.playing === 'IDLE') {
      this.unmount();
    } // else if playing === 'CLOSING' don't do anything with user interaction
    // highlight-end
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
        ref={this.cardModalRef}
        onClick={this.onModalClick}
      >
        <h3 style={{ color: primary }}>{name}</h3>
      </div>
    )
  }
};

export default CardModal;
```
In `componentDidMount()` the state is set to `PLAYING`, an `onfinish` handler is added to set the update the state when the animation finishes and `this.anim = anim;` is added which stores this animation and will let us reverse it (or otherwise modify it) elsewhere in the code.

In `unmount()` the only change needed is to set the state to `CLOSING`. At this point user interaction won't do anything and the CardModal will play the unmount animation and unmount.

Deciding what to do and modifying the animation happens in `onModalClick()`. If the state is `OPENING` the current animation is still playing so `reverse()` is called on it. Here are the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Animation/reverse) on the reverse method. This animation currently has an `onfinish` handler that will set the state to `IDLE` (this was added in `componentDidMount()`). This handler is changed to trigger the `unmountAction` which will unmount the CardModal.

If the state is `IDLE` then `unmount()` is called and the CardModal animates and unmounts as before.

If the state is `CLOSING` the CardModal is already unmounting so the user click is ignored and the CardModal unmounts.
 
 That's it we now have a clickable card which grows to the full size of the screen. Extra content can be added to the CardModal along with mount/unmount animations for that content so the cards could display extra info smoothly as the user clicks on them.

 The [live demo](https://react-animated-card-modal.netlify.com/) and [Github repository](https://github.com/mthom26/animated-card-modal) are available online.