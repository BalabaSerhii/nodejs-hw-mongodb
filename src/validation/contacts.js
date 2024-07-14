import Joi from 'joi';

const phoneNumberPattern = /^[0-9]+$/;

export const createContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': 'Name can only contain letters and spaces.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be at most 20 characters long.',
      'any.required': 'Name is required.',
    }),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
    .min(11)
    .max(15)
    .required()
    .messages({
      'string.pattern.base': 'Phone number can only contain digits.',
      'string.min': 'Phone number must be at least 11 digits long.',
      'string.max': 'Phone number must be at most 15 digits long.',
      'any.required': 'Phone number is required.',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Please enter a valid email address.',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.only': 'Contact type must be one of "work", "home", or "personal".',
      'any.required': 'Contact type is required.',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .min(3)
    .max(20)
    .messages({
      'string.pattern.base': 'Name can only contain letters and spaces.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.max': 'Name must be at most 20 characters long.',
    }),
  phoneNumber: Joi.string()
    .pattern(phoneNumberPattern)
    .min(11)
    .max(15)
    .messages({
      'string.pattern.base': 'Phone number can only contain digits.',
      'string.min': 'Phone number must be at least 11 digits long.',
      'string.max': 'Phone number must be at most 15 digits long.',
    }),
  email: Joi.string().email().messages({
    'string.email': 'Please enter a valid email address.',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of "work", "home", or "personal".',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be updated.',
  });
