const validator = require('validator');
const isEmpty = require('./is-empty');

const validateEducationInput = data => {
  const errors = {};

  let { institute, degree, major, location, from } = data;

  institute = isEmpty(institute) ? '' : institute;
  degree = isEmpty(degree) ? '' : degree;
  major = isEmpty(major) ? '' : major;
  location = isEmpty(location) ? '' : location;
  from = isEmpty(from) ? '' : from;

  if (validator.isEmpty(institute)) {
    errors.institute = 'Institute is required';
  }

  if (validator.isEmpty(degree)) {
    errors.degree = 'Degree is required';
  }

  if (validator.isEmpty(major)) {
    errors.major = 'Major is required';
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

module.exports = validateEducationInput;
