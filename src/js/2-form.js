import '../css/2-form.css';

document.addEventListener('DOMContentLoaded', function () {
  const formData = {
    email: '',
    message: '',
    clear() {
      this.email = '';
      this.message = '';
    },
  };

  const form = document.querySelector('.feedback-form');
  form.addEventListener('submit', handleSubmit);
  form.addEventListener('input', handleInput);

  const LS_KEY = 'feedback-form-state';
  const savedFormData = getFormDataFromLocalStorage();

  if (savedFormData) {
    formData.email = form.email.value = savedFormData.email;
    formData.message = form.message.value = savedFormData.message;
  }

  function getFormDataFromLocalStorage() {
    const savedData = localStorage.getItem(LS_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  }

  function handleInput(event) {
    const key = event.target.name;
    const value = event.target.value.trim();
    formData[key] = value;

    localStorage.setItem(LS_KEY, JSON.stringify(formData));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    if (formData.email === '' || formData.message === '') {
      return alert('Fill please all fields');
    }
    console.log(formData);
    localStorage.removeItem(LS_KEY);
    formData.clear();
    form.reset();
  }
});
