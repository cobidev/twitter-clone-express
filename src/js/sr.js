export default function() {
  const defaultProps = {
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    distance: '30px',
    duration: 1000,
    desktop: true,
    mobile: true
  };

  // Welcome Section
  ScrollReveal().reveal('#welcome-title', {
    ...defaultProps,
    delay: 500,
    origin: 'left'
  });
  ScrollReveal().reveal('#welcome-illustration', {
    ...defaultProps,
    delay: 1000,
    origin: 'bottom'
  });

  // Search Section
  ScrollReveal().reveal('#list-users', {
    ...defaultProps,
    delay: 500,
    origin: 'bottom'
  });

  // Profile Section
  ScrollReveal().reveal('.profile-info-wrapper', {
    ...defaultProps,
    delay: 500,
    origin: 'bottom'
  });
  ScrollReveal().reveal('.profile-tweet-wrapper', {
    ...defaultProps,
    delay: 1000,
    origin: 'left'
  });
}
