const validator = require('validator');
const isEmpty = require('./is-empty');

const validateSignupInput = data => {
  const errors = {};

  const { name, email, password, confirmPassword } = data;

  if (!validator.isLength(name, { min: 2, max: 25 })) {
    errors.name = 'Name must be between 2 and 25 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSignupInput;
