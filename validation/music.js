const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMusicInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  
  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }

  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};