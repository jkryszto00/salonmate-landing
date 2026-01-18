/**
 * Navigation scroll effects
 * Handles nav background change and sticky CTA visibility
 */

export function initNavigation(): void {
  const nav = document.getElementById('nav');
  const stickyCta = document.getElementById('stickyCta');

  if (!nav) return;

  const handleScroll = (): void => {
    const scrolled = window.scrollY > 50;
    nav.classList.toggle('scrolled', scrolled);

    if (stickyCta) {
      stickyCta.classList.toggle('visible', window.scrollY > 600);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Initial check
  handleScroll();
}

/**
 * Smooth scroll for anchor links
 */
export function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        target?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
