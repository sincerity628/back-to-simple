const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// function
const showError = (input, errMsg) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = errMsg;
}

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

const getFiledName = (input) => {
  const id = input.id;
  return id.charAt(0).toUpperCase() + id.slice(1);
};

const checkRequired = (inputArr) => {
  inputArr.forEach(input => {
    if(!input.value.trim()) {
      showError(input, `${ getFiledName(input) } is required`);
    } else {
      showSuccess(input);
    }
  });
}

const checkLength = (input, min, max) => {
  const length = input.value.length;
  if(length < min) {
    showError(input, `${getFiledName(input)} must be at least ${min} characters`);
  } else if(length > max) {
    showError(input, `${getFiledName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

const checkPasswordMatch = (input1, input2) => {
  if(input1.value !== input2.value) {
    showError(input2, 'Passwords do not match.');
  }
}

// event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
