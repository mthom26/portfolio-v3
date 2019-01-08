require("./src/prism-tomorrow.css");

// Add intersection observer polyfill if needed
exports.onClientEntry = () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer');
    console.log('IntersectionObserver is polyfilled');
  }
};