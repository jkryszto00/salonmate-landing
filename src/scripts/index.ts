/**
 * Main script entry point
 * Initializes all interactive features
 */

import { initNavigation, initSmoothScroll } from './navigation';
import { initChatAnimation } from './chat-animation';
import { initFAQ } from './faq';
import { initForms } from './forms';

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSmoothScroll();
  initChatAnimation();
  initFAQ();
  initForms();
});
