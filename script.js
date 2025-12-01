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
