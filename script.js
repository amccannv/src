// JavaScript for active nav link highlighting and potentially more complex scroll later
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  const navLogo = document.querySelector('.nav-logo');

  // Function to update active nav link
  const updateActiveLink = () => {
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - (document.getElementById('navbar').offsetHeight + 50); // Adjust offset as needed
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });

    // Hide/show nav logo based on current section
    if (currentSectionId === 'home') {
      navLogo.classList.add('hidden');
    } else {
      navLogo.classList.remove('hidden');
    }
  };

  // Initial call and on scroll
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink);

  // Smooth scroll for nav links (CSS scroll-behavior is primary, this is a fallback/enhancement)
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      // Check if it's an internal link
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Calculate scroll position considering the fixed navbar
          const navHeight = document.getElementById('navbar').offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// Function to scroll to a specific section (for logo click)
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const navHeight = document.getElementById('navbar').offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
} 