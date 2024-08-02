import Joi from 'joi';

const addContactErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'string.min': 'Field {#label} should have a minimum length of {#limit}.',
  'string.max': 'Field {#label} should have a maximum length of {#limit}.',
  'any.required': 'missing required {#label} field',
};

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(addContactErrorMessages),
  phoneNumber: Joi.string()
    .min(11)
    .max(15)
    .required()
    .messages(addContactErrorMessages),
  email: Joi.string().email().messages(addContactErrorMessages),
  isFavourite: Joi.boolean().messages(addContactErrorMessages),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages(addContactErrorMessages),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(11).max(15),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
