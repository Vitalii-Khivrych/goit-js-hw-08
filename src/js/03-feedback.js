import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const SAVE_DATA_KEY = 'feedback-form-state';

const formData = {};

populateFormFields();

refs.form.addEventListener('input', throttle(onSaveFormField, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onSaveFormField(evt) {
  formData[evt.target.name] = evt.target.value;
  // console.log(formData);

  localStorage.setItem(SAVE_DATA_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();

  const { email, message } = evt.currentTarget.elements;

  if (email.value === '' || message.value === '') {
    return console.log('Будь ласка заповнити усі поля');
  }

  // const sentDataValues = { email: email.value, message: message.value };
  // console.log(sentDataValues);

  console.log(formData);

  evt.currentTarget.reset();

  localStorage.removeItem(SAVE_DATA_KEY);
}

function populateFormFields() {
  const formStringValue = localStorage.getItem(SAVE_DATA_KEY);

  if (formStringValue) {
    const formObjectValue = JSON.parse(formStringValue);

    for (const key in formObjectValue) {
      formData[key] = formObjectValue[key];
    }

    refs.form.elements.email.value = formData.email ? formData['email'] : '';

    refs.form.elements.message.value = formData.message ? formData['message'] : '';
  }
}
