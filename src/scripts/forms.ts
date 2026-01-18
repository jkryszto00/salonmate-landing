/**
 * Form Handling
 * Handles waitlist form submission and modals
 */

let hasSubmitted = false;
let exitShown = false;

function showModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  modal?.classList.add('visible');
}

function hideModal(modalId: string): void {
  const modal = document.getElementById(modalId);
  modal?.classList.remove('visible');
}

export function initForms(): void {
  const waitlistForm = document.getElementById('waitlistForm') as HTMLFormElement | null;
  const exitForm = document.getElementById('exitForm') as HTMLFormElement | null;
  const closeModalBtn = document.getElementById('closeModal');
  const successModal = document.getElementById('successModal');
  const exitPopup = document.getElementById('exitPopup');
  const exitPopupClose = document.getElementById('exitPopupClose');

  // Waitlist form submission
  waitlistForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = waitlistForm.querySelector('input') as HTMLInputElement;
    console.log('Email:', input.value);
    hasSubmitted = true;
    showModal('successModal');
    waitlistForm.reset();
  });

  // Close success modal
  closeModalBtn?.addEventListener('click', () => {
    hideModal('successModal');
  });

  // Click outside to close success modal
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) {
      hideModal('successModal');
    }
  });

  // Exit intent detection
  document.addEventListener('mouseout', (e: MouseEvent) => {
    if (e.clientY < 10 && !exitShown && !hasSubmitted) {
      showModal('exitPopup');
      exitShown = true;
    }
  });

  // Close exit popup
  exitPopupClose?.addEventListener('click', () => {
    hideModal('exitPopup');
  });

  // Click outside to close exit popup
  exitPopup?.addEventListener('click', (e) => {
    if (e.target === exitPopup) {
      hideModal('exitPopup');
    }
  });

  // Exit form submission
  exitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = exitForm.querySelector('input') as HTMLInputElement;
    console.log('Exit email:', input.value);
    hasSubmitted = true;
    hideModal('exitPopup');
    showModal('successModal');
  });
}
