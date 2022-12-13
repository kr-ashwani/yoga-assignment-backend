const mongoose = require('mongoose');
const { isEmail } = require('validator');

const schemaOptions = {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'lastLoginAt',
  },
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'enter name'],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: [true, 'This email is already registered'],
      validate: [isEmail, 'Please enter a valid email'],
      required: [true, 'enter email address'],
    },
    password: {
      type: String,
      minlength: [6, 'Minimum password length should be 6 characters'],
      required: [true, 'enter password'],
    },
    enrolled: {
      type: Boolean,
      default: false,
    },
    yogaEnrollId: {
      type: String,
      default: null,
    },
  },
  schemaOptions
);

const User = mongoose.model('user', UserSchema);
module.exports = User;
