const validator = require('validator');
const isEmpty = require('./is-empty');

const validateProfileInput = data => {
  const errors = {};

  let { handle, status, skills } = data;

  let siteUrls = [
    'website',
    'youtube',
    'twitter',
    'linkedin',
    'instagram',
    'facebook',
    'avatarURL'
  ];

  handle = isEmpty(handle) ? '' : handle;
  status = isEmpty(status) ? '' : status;
  skills = isEmpty(skills) ? '' : skills;

  if (!validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be between 2 and 40 characters';
  }

  if (validator.isEmpty(handle)) {
    errors.handle = 'Handle is required';
  }

  if (validator.isEmpty(status)) {
    errors.status = 'Status is required';
  }

  if (validator.isEmpty(skills)) {
    errors.skills = 'Skills are required';
  }

  siteUrls.forEach(url => {
    if (!isEmpty(data[url])) {
      if (!validator.isURL(data[url])) {
        errors[url] = `Not a valid ${url} URL`;
      }
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
