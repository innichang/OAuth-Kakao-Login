const emailValidationCheck = async email => {
  const emailValidation = new RegExp("^[a-zA-Z0-9._-]+@[a-z]{2,}.[a-z]{2,}$");
  if (!emailValidation.test(email)) {
    const error = new Error("EMAIL IS NOT VALID");
    error.statusCode = 400;
    throw error;
  }
  return emailValidation;
};

const passwordValidationCheck = async password => {
  const pwValidation = new RegExp("t^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})");

  if (!pwValidation.test(password)) {
    const error = new Error("PASSWORD IS NOT VALID");
    error.statusCode = 400;
    throw error;
  }
  return pwValidation;
};

module.exports = {
  passwordValidationCheck,
  emailValidationCheck
};
