/**
 * Portfolio Reveal Animation
 * Implements a staggered slide-up and fade effect using Intersection Observer.
 */
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select all elements with the 'reveal' class to animate
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el, index) => {
    // Optional: Add a small staggered delay for groups of elements
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });
});