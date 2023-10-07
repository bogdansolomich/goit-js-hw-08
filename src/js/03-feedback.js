
import throttle from 'lodash.throttle';


const FORM_KEY_LOCAL = 'feedback-form-state';
const form = document.querySelector('.feedback-form');


form.addEventListener('input', throttle(handlerInput, 500));
form.addEventListener('submit', handlerSubmit);

//Запис даних у сховище

function handlerInput(evt) {
  let data = localStorage.getItem(FORM_KEY_LOCAL);
  data = data ? JSON.parse(data) : {};
  data[evt.target.name] = evt.target.value;
  localStorage.setItem(FORM_KEY_LOCAL, JSON.stringify(data));
};

//Виведення даних сховища у консоль, очищення сховища і форми
 
function handlerSubmit(evt) {
  evt.preventDefault();
  const { email, message } = evt.currentTarget.elements;
  console.log({ email: email.value, message: message.value });
  if (localStorage.getItem(FORM_KEY_LOCAL)) {
    localStorage.removeItem(FORM_KEY_LOCAL);
  }
   evt.currentTarget.reset();
};

// Перевірка сховища

function checkFeedbackForm() {
  let data = localStorage.getItem(FORM_KEY_LOCAL);
  if (!data) return;
  data = JSON.parse(data);
 
  for (const key in data) {
    form.elements[key].value = data[key] || '';
  }
};

checkFeedbackForm();