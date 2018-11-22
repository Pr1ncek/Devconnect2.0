const validator = require('validator');
const isEmpty = require('./is-empty');

const validateSignupInput = data => {
  const errors = {};

  let { name, email, password, confirmPassword } = data;
  name = isEmpty(name) ? '' : name;
  email = isEmpty(email) ? '' : email;
  password = isEmpty(password) ? '' : password;
  confirmPassword = isEmpty(confirmPassword) ? '' : confirmPassword;

  if (!validator.isLength(name, { min: 2, max: 25 })) {
    errors.name = 'Name must be between 2 and 25 characters';
  }

  if (validator.isEmpty(name)) {
    errors.name = 'Name is required';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email is required';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Invalid email';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password is required';
  }

  if (!validator.isLength(password, { min: 5, max: 25 })) {
    errors.password = 'Password must be between 2 and 25 characters';
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Password does not match';
  }

  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Confirm password';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validateSignupInput;
