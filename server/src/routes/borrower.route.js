const express = require("express")
const { sendEmail } = require("../controllers/email.controller.js")
const { authenticateUser } = require("../middlewares/auth.middleware.js")
const { checkSchema } = require("express-validator")
const { emailContentValidationSchema } = require("../validators/email.validation.js")

const router = express.Router()

router.route("/email").post(authenticateUser, checkSchema(emailContentValidationSchema), sendEmail)

module.exports = router