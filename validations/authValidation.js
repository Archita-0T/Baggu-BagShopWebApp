const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password should have a minimum length of 8',
  }),
  fullname: Joi.string().min(3).required().messages({
    'string.empty': 'Full name is required',
    'string.min' : 'FullName should have a minimum length of 3',
  }),
});

module.exports = {
  registerSchema,
};
