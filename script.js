document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section');
  const navLinks = document.querySelectorAll('#navbar .nav-links a');
  const nav = document.getElementById('navbar');

  const setActiveLink = (currentSectionId) => {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  };

  const navHeight = nav?.offsetHeight ?? 0;
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) {
        setActiveLink(visible.target.id);
      }
    },
    {
      threshold: 0.55,
      rootMargin: `-${navHeight}px 0px -45% 0px`
    }
  );

  sections.forEach((section) => observer.observe(section));

  const initialId = window.location.hash?.replace('#', '') || sections[0]?.getAttribute('id');
  if (initialId) setActiveLink(initialId);
});
