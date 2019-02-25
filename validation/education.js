const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.college = !isEmpty(data.college) ? data.college : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.field = !isEmpty(data.field) ? data.field : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.college)) {
    errors.college = 'College field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.field)) {
    errors.field = 'Field of study field is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};