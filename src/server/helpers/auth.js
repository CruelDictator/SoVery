const { AuthenticationError } = require('apollo-server-express');
const { hash } = require('bcryptjs');
const { User } = require('../models/models');

const loggedIn = req => req.session.userId;
const Authorized = req => req.session.userRole;

const attemptLogIn = async (email, password) => {
  let message = 'Incorrect email or password. Please try again.';

  const user = await User.findOne({ email });

  if (!user || !(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  } else if (!user.isVerified) {
    message = 'User not verified, check your email!';
    throw new AuthenticationError(message);
  }

  return user;
};

const LogOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);

      res.clearCookie('sid');

      resolve(true);
    });
  });

const verifyPasswordChange = async (req, password, newPassword) => {
  let message = 'Same password used. Please choose a new one.';

  const user = await User.findOne({ _id: loggedIn(req) });

  if (password === newPassword) {
    throw new AuthenticationError(message);
  }

  if (!user || !(await user.matchesPassword(password))) {
    message = 'Incorrect password. Please try again.';
    throw new AuthenticationError(message);
  }

  newPassword = await hash(newPassword, 12);

  return newPassword;
};

const verifyForgotPasswordChange = async (verifiedToken, newPassword) => {
  const message = 'Same password used. Please choose a new one.';

  const user = await User.findOne({ _id: verifiedToken.user });

  console.log(user);

  if (!user || (await user.matchesPassword(newPassword))) {
    throw new AuthenticationError(message);
  }

  newPassword = await hash(newPassword, 12);

  return newPassword;
};

const ensureLoggedIn = req => {
  if (!loggedIn(req)) {
    throw new AuthenticationError('You must be logged in.');
  }
};

const ensureLoggedOut = req => {
  if (loggedIn(req)) {
    throw new AuthenticationError('You are already logged in.');
  }
};

const ensureAuthorized = (req, requiredRole) => {
  if (Authorized(req) !== requiredRole) {
    throw new AuthenticationError('You are not Authorized.');
  }
};

module.exports = {
  attemptLogIn,
  LogOut,
  verifyPasswordChange,
  verifyForgotPasswordChange,
  ensureLoggedIn,
  ensureLoggedOut,
  ensureAuthorized
};
