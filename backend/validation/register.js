const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isStrongPassword(data.password, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
    returnScore: false
  })) {
    errors.password = "Password must meet complexity requirements (at least one number, at least 6 characters in length)";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
