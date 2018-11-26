const validator = require('validator');
const isEmpty = require('./is-empty');

const validatePostInput = data => {
  const errors = {};

  let { title, content } = data;

  title = isEmpty(title) ? '' : title;
  content = isEmpty(content) ? '' : content;

  if (!validator.isLength(title, { min: 2, max: 100 })) {
    errors.title = 'Title must be between 2 and 100 characters';
  }

  if (validator.isEmpty(title)) {
    errors.title = 'Title is required';
  }

  if (!validator.isLength(content, { min: 10 })) {
    errors.content = 'Content must be between atleast 10 characters';
  }

  if (validator.isEmpty(content)) {
    errors.content = 'Content is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;
