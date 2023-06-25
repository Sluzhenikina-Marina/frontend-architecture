import keyBy from 'lodash/keyBy.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN

export default () => {
  const form = document.querySelector('form');

  const elements = {
    name: form.querySelector('#sign-up-name'),
    email: form.querySelector('#sign-up-email'),
    password: form.querySelector('#sign-up-password'),
    passwordConfirmation: form.querySelector('#sign-up-password-confirmation'),
  }

  const elementsValues = {
    name: elements.name.value,
    email: elements.email.value,
    password: elements.password.value,
    passwordConfirmation: elements.passwordConfirmation.value,
  }

  const container = document.querySelector('[data-container="sign-up"]');

  let allFieldsComplete = false;

  const submitBtn = form.querySelector('[type="submit"]');


  form.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', (event) => {  
      event.preventDefault();
  
      elementsValues[input.getAttribute('name')] = input.value;

      let errors = validate(elementsValues);

      form.querySelectorAll('.is-invalid').forEach(element => {
        element.classList.remove('is-invalid');
      });
      form.querySelectorAll('.invalid-feedback').forEach(element => {
        element.remove();
      });

      Object.entries(errors).forEach(([errorName, errorMessage]) => {
        if (Object.keys(errors).includes(errorName)) {
          const errorElement = document.createElement('div');
          errorElement.classList.add('invalid-feedback');
          errorElement.textContent = errorMessage.message;
          elements[errorName].classList.add('is-invalid');
          elements[errorName].after(errorElement);
        }
      });
      
      let t = true;
      for (let key in elementsValues) {
        if (elementsValues[key] === '') {
          t = false;
        }
      }

      if (t == true) allFieldsComplete = true;

  
      if (isEmpty(errors) && allFieldsComplete) {
        submitBtn.removeAttribute('disabled')
      } else {
        submitBtn.setAttribute('disabled', true);
      }
      
    })
  })

  submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const userData = {
      name: elementsValues.name,
      email: elementsValues.email,
      password: elementsValues.password,
    }
    const response = await axios.post(routes.usersPath(), userData);
    if (response) {
      container.innerHTML = 'User Created!';
    }

  })

}

// END
