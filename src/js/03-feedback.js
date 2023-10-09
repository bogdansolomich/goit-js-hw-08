import { throttle } from 'lodash';
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');
const sendButton = form.querySelector('button[type="submit"]');
sendButton.disabled = true;
//! заборона відправки пустих полів
form.addEventListener("input", function() {
  sendButton.disabled = emailInput.value === '' || messageInput.value === '';
});

//! зберігаемо у сховище кожні піві секунди
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500);

emailInput.addEventListener('input', saveFormState);
messageInput.addEventListener('input', saveFormState);
//! отримуємо зі сховища
const savedState = localStorage.getItem('feedback-form-state');

if (savedState) {
  const parsedState = JSON.parse(savedState);
  emailInput.value = parsedState.email;
  messageInput.value = parsedState.message;
}
//! очищення сховища та полів
form.addEventListener('submit', event => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formState);

  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
  sendButton.disabled = true;
});