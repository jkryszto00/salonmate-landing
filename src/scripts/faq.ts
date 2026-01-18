/**
 * FAQ Accordion
 * Handles FAQ item toggle functionality
 */

export function initFAQ(): void {
  const faqQuestions = document.querySelectorAll<HTMLButtonElement>('.faq-question');

  faqQuestions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      if (!item) return;

      const isOpen = item.classList.contains('open');

      // Close all items
      document.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
      });

      // Open clicked item if it wasn't open
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}
