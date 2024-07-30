import Joi from 'joi';

const phoneNumberPattern = /^[0-9]+$/;

const addContactErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'string.min': 'Field {#label} should have a minimum length of {#limit}.',
  'string.max': 'Field {#label} should have a maximum length of {#limit}.',
  'any.required': 'Missing required {#label} field',
  'string.pattern.base': 'Field {#label} can only contain letters and spaces.',
};

export const createContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .min(3)
    .max(20)
    .required()
    .messages(addContactErrorMessages),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
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
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .min(3)
    .max(20)
    .messages(addContactErrorMessages),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
    .min(11)
    .max(15)
    .messages(addContactErrorMessages),
  email: Joi.string().email().messages(addContactErrorMessages),
  isFavourite: Joi.boolean().messages(addContactErrorMessages),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .messages(addContactErrorMessages),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be updated.',
  });
