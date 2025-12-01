// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');

  // Change icon
  if (document.body.classList.contains('light')) {
    themeToggle.textContent = '🌞';
  } else {
    themeToggle.textContent = '🌙';
  }
});
let lastScroll = 0;
const toggleButton = document.getElementById('theme-toggle');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // scrolling down → hide button
    toggleButton.classList.add('hide');
  } else {
    // scrolling up → show button
    toggleButton.classList.remove('hide');
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});
