const { User } = require("../models/user.model.js");

const passwordValidation = {
  escape: true,
  isStrongPassword: {
    errorMessage:
      "minimum 8 charters, 1 lowercase, 1 uppercase, 1 number, 1 special character",
  },
};

const loginValidationSchema = {
  email: {
    escape: true,
    trim: true,
    normalizeEmail: true,
    isEmail: {
      errorMessage: "valid email required",
    },
  },
  password: passwordValidation,
};

const signupValidationSchema = {
  name: {
    escape: true,
    trim: true,
    toLowerCase: true,
    isLength: {
        options: {min: 3},
      errorMessage: "valid name required, minimum 3 character",
    },
  },
  email: {
    escape: true,
    trim: true,
    normalizeEmail: true,
    isEmail: {
      errorMessage: "valid email required",
    },
    custom: {
      options: async (email) => {
        const user = await User.findOne({ email });

        if (user) {
          throw new Error("email is already in use");
        } else {
          return true;
        }
      },
    },
  },
  password: passwordValidation,
};

module.exports = { loginValidationSchema, signupValidationSchema };