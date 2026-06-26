import Joi from 'joi';

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\|,.<>/?]).{8,16}$/;

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(20).max(60).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().pattern(passwordPattern).required(),
  address: Joi.string().trim().max(400).allow('', null)
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required()
});

export const passwordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().pattern(passwordPattern).required()
});

export const userCreateSchema = Joi.object({
  name: Joi.string().trim().min(20).max(60).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().pattern(passwordPattern).required(),
  address: Joi.string().trim().max(400).allow('', null),
  role: Joi.string().valid('ADMIN', 'USER', 'STORE_OWNER').required()
});

export const storeCreateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().trim().email().required(),
  address: Joi.string().trim().max(400).required(),
  owner_id: Joi.number().integer().required()
});

export const ratingSchema = Joi.object({
  store_id: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required()
});
