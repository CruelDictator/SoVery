const mongoose = require('mongoose');
const { compare } = require('bcryptjs');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    name: String,
    password: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);

userSchema.statics.doesntExist = async function (options) {
  return (await this.where(options).countDocuments()) === 0;
};

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
