const validator = require('validator');
const isEmpty = require('./is-empty');

const validateExperienceInput = data => {
  const errors = {};

  let { title, company, location, from } = data;

  title = isEmpty(title) ? '' : title;
  company = isEmpty(company) ? '' : company;
  location = isEmpty(location) ? '' : location;
  from = isEmpty(from) ? '' : from;

  if (validator.isEmpty(title)) {
    errors.title = 'Title is required';
  }

  if (validator.isEmpty(company)) {
    errors.company = 'Company is required';
  }

  if (validator.isEmpty(from)) {
    errors.from = 'From is required';
  }
  if (validator.isEmpty(location)) {
    errors.location = 'Location is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
