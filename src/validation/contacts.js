import Joi from 'joi';

const phoneNumberPattern = /^[0-9]+$/;

const addContactErrorMessages = {
  'string.base': 'Field {#label} must be a string.',
  'string.empty': 'Field {#label} cannot be empty.',
  'string.email': 'Field {#label} must be a valid email address.',
  'string.min': 'Field {#label} should have a minimum length of {#limit}.',
  'string.max': 'Field {#label} should have a maximum length of {#limit}.',
  'string.pattern.base': 'Field {#label} can only contain valid characters.',
  'any.required': 'missing required {#label} field',
  'any.only': 'Field {#label} must be one of {#valids}.',
  'object.min': 'At least one field must be updated.',
};

export const createContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/) // Only letters and spaces
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': addContactErrorMessages[
        'string.pattern.base'
      ].replace('{#label}', 'Name'),
      'string.min': addContactErrorMessages['string.min']
        .replace('{#label}', 'Name')
        .replace('{#limit}', '3'),
      'string.max': addContactErrorMessages['string.max']
        .replace('{#label}', 'Name')
        .replace('{#limit}', '20'),
      'any.required': addContactErrorMessages['any.required'].replace(
        '{#label}',
        'Name',
      ),
    }),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern) // Only digits
    .min(11)
    .max(15)
    .required()
    .messages({
      'string.pattern.base': addContactErrorMessages[
        'string.pattern.base'
      ].replace('{#label}', 'Phone number'),
      'string.min': addContactErrorMessages['string.min']
        .replace('{#label}', 'Phone number')
        .replace('{#limit}', '11'),
      'string.max': addContactErrorMessages['string.max']
        .replace('{#label}', 'Phone number')
        .replace('{#limit}', '15'),
      'any.required': addContactErrorMessages['any.required'].replace(
        '{#label}',
        'Phone number',
      ),
    }),
  email: Joi.string()
    .email()
    .messages({
      'string.email': addContactErrorMessages['string.email'].replace(
        '{#label}',
        'Email',
      ),
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': addContactErrorMessages['any.only']
        .replace('{#label}', 'Contact type')
        .replace('{#valids}', '"work", "home", or "personal"'),
      'any.required': addContactErrorMessages['any.required'].replace(
        '{#label}',
        'Contact type',
      ),
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/) // Only letters and spaces
    .min(3)
    .max(20)
    .messages({
      'string.pattern.base': addContactErrorMessages[
        'string.pattern.base'
      ].replace('{#label}', 'Name'),
      'string.min': addContactErrorMessages['string.min']
        .replace('{#label}', 'Name')
        .replace('{#limit}', '3'),
      'string.max': addContactErrorMessages['string.max']
        .replace('{#label}', 'Name')
        .replace('{#limit}', '20'),
    }),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern) // Only digits
    .min(11)
    .max(15)
    .messages({
      'string.pattern.base': addContactErrorMessages[
        'string.pattern.base'
      ].replace('{#label}', 'Phone number'),
      'string.min': addContactErrorMessages['string.min']
        .replace('{#label}', 'Phone number')
        .replace('{#limit}', '11'),
      'string.max': addContactErrorMessages['string.max']
        .replace('{#label}', 'Phone number')
        .replace('{#limit}', '15'),
    }),
  email: Joi.string()
    .email()
    .messages({
      'string.email': addContactErrorMessages['string.email'].replace(
        '{#label}',
        'Email',
      ),
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .messages({
      'any.only': addContactErrorMessages['any.only']
        .replace('{#label}', 'Contact type')
        .replace('{#valids}', '"work", "home", or "personal"'),
    }),
})
  .min(1)
  .messages({
    'object.min': addContactErrorMessages['object.min'],
  });
