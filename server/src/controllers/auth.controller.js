const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const {
  CustomError,
  CustomValidationError,
} = require("../utils/errors.util.js");
const { validationResult } = require("express-validator");

const authController = {};

/*
POST /api/v1/auth/signup
Auth: no
Access: public
*/
authController.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomValidationError(errors.array(), 400);
    }

    const body = _.pick(req.body, ["name", "email", "password"]);

    const user = new User(body);

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    const documentLength = await User.countDocuments();
    if (!documentLength) {
      user.role = "admin";
    }

    await user.save();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );

    res.status(201).json({ token });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

/*
POST /api/v1/auth/login
Auth: no
Access: public
*/
authController.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomValidationError(errors.array(), 400);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("invalid email or password", 404));
    }

    const checkValidPassword = await bcrypt.compare(password, user.password);
    if (!checkValidPassword) {
      return next(new CustomError("invalid email or password", 404));
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    res.json({ token });
  } catch (err) {
    next(new CustomError(err.message));
  }
};

module.exports = { authController };
