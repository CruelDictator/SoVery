const Joi = require('joi');
const JoiObjectId = require('joi-objectid');

Joi.objectId = JoiObjectId(Joi);

const email = Joi.string()
  .min(3)
  .max(255)
  .email()
  .required()
  .label('Email');

const username = Joi.string()
  .alphanum()
  .min(4)
  .max(30)
  .required()
  .label('Username');

const name = Joi.string()
  .min(4)
  .max(255)
  .required()
  .label('Name');

const password = Joi.string()
  .min(8)
  .max(50)
  .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
  .required()
  .label('Password')
  .messages({
    'string.pattern.base': 'Password must have at least one letter and one digit.'
  });

const token = Joi.string()
  .token()
  .length(32);

module.exports = {
  findUser: Joi.object().keys({
    id: Joi.objectId()
  }),
  signUp: Joi.object().keys({
    email,
    username,
    name,
    password
  }),
  LogIn: Joi.object().keys({
    email,
    password
  }),
  ChangePassword: Joi.object().keys({
    password,
    newPassword: password
  }),
  sendUserToken: Joi.object().keys({
    email
  }),
  verifyUser: Joi.object().keys({
    token
  }),
  ChangePasswordWithToken: Joi.object().keys({
    token,
    newPassword: password
  })
};
