import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');
const btn = document.querySelector('button');

form.addEventListener('input', throttle(getValues, 500));

function getValues() {
  const formData = {
    email: email.value,
    message: message.value,
  };
  if (email.value && message.value) {
    btn.removeAttribute('disabled');
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  } else {
    btn.setAttribute('disabled', 'true');
  }
}

document.addEventListener('DOMContentLoaded', autocomplete);

function autocomplete() {
  const formState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formState) {
    email.value = formState.email;
    message.value = formState.message;
  }
  if (email.value && message.value) {
    btn.removeAttribute('disabled');
  }
}

form.addEventListener('submit', clearValues);

function clearValues(e) {
  e.preventDefault();
  console.log({
    email: email.value,
    message: message.value,
  });
  localStorage.removeItem('feedback-form-state');
  e.target.reset();
}