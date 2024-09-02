const express = require("express");
const { authController } = require("../controllers/auth.controller.js");
const { checkSchema } = require("express-validator");
const { signupValidationSchema, loginValidationSchema } = require("../validators/auth.validation.js");

const router = express.Router();

router.route("/signup").post(checkSchema(signupValidationSchema), authController.signup);
router.route("/login").post(checkSchema(loginValidationSchema), authController.login);

module.exports = router;