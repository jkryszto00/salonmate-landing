/**
 * Chat Animation
 * Animates the phone mockup chat conversation
 */

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

const conversation: ChatMessage[] = [
  { type: 'user', text: 'Hej, ile kosztuje balayage?' },
  { type: 'bot', text: 'Cześć! Balayage od 350 zł. Mamy wolne: czwartek 10:00 i piątek 14:00. Który pasuje?' },
  { type: 'user', text: 'Czwartek!' },
  { type: 'bot', text: 'Gotowe! Czwartek, 10:00 u Ani. Wyślę przypomnienie dzień wcześniej.' },
];

function showMessage(container: HTMLElement, msg: ChatMessage): void {
  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${msg.type}`;
  msgEl.textContent = msg.text;
  container.appendChild(msgEl);
  requestAnimationFrame(() => msgEl.classList.add('visible'));
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator(container: HTMLElement): HTMLElement {
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(typing);
  requestAnimationFrame(() => typing.classList.add('visible'));
  return typing;
}

export function initChatAnimation(): void {
  const chatContainer = document.getElementById('chat');
  if (!chatContainer) return;

  let msgIndex = 0;

  function runConversation(): void {
    if (msgIndex >= conversation.length) {
      // Reset after delay
      setTimeout(() => {
        const timeEl = chatContainer.querySelector('.chat-time');
        chatContainer.innerHTML = '';
        if (timeEl) chatContainer.appendChild(timeEl);
        msgIndex = 0;
        runConversation();
      }, 4000);
      return;
    }

    const currentMsg = conversation[msgIndex];

    if (currentMsg.type === 'bot') {
      const typing = showTypingIndicator(chatContainer);

      setTimeout(() => {
        typing.remove();
        showMessage(chatContainer, currentMsg);
        msgIndex++;
        setTimeout(runConversation, 1800);
      }, 1200);
    } else {
      showMessage(chatContainer, currentMsg);
      msgIndex++;
      setTimeout(runConversation, 1200);
    }
  }

  // Start animation after delay
  setTimeout(runConversation, 1500);
}
