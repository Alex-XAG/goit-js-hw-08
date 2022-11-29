import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');

initForm();

formEl.addEventListener('submit', formSubmitHandler);
formEl.addEventListener('input', throttle(formInputHandler, 500));

function formSubmitHandler(event) {
  event.preventDefault();
  const formData = new FormData(formEl);
  formData.forEach((value, name) => console.log(value, name));
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function formInputHandler(event) {
  let inputText = localStorage.getItem(STORAGE_KEY);
  inputText = inputText ? JSON.parse(inputText) : {};
  inputText[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputText));
}

function initForm() {
  let inputText = localStorage.getItem(STORAGE_KEY);
  if (inputText) {
    inputText = JSON.parse(inputText);
    Object.entries(inputText).forEach(([name, value]) => {
      formEl.elements[name].value = value;
    });
  }
}

// import throttle from "lodash.throttle";

// const STORAGE_KEY = 'feedback';
// const formData ={};

// const refs = {
//     form: document.querySelector('.js-feedback'),
//     textarea: document.querySelector('.js-feedback textarea'),
// };

// refs.form.addEventListener('submit', onFormsubmit);
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

// refs.form.addEventListener('input', e => {
//     // console.log(e.target.name);
//     // console.log(e.target.value);

//     formData[e.target.name] = e.target.value;
//     localStorage.setItem(FORM_STATE, JSON.stringify(formData));
//     console.log(formData);
// });

// populateTextarea();

// function onFormsubmit(evt) {
//     evt.prevenDefault();
//     console.log('Отправляем форму');
//     evt.curentTarget.reset();
//     localStorage.removeItem(STORAGE_KEY);
// };

// function onTextareaInput(evt) {
//     const message = evt.target.value;
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(message));
// };

// function populateTextarea() {
//     const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
//     if (savedMessage) {
//         console.log(savedMessage);
//         refs.textarea.value = savedMessage;
//     }
// };
