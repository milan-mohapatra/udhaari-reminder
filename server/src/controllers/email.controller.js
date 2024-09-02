const { validationResult } = require("express-validator");
const { User } = require("../models/user.model.js");
const { CustomError, CustomValidationError } = require("../utils/errors.util.js");
const {sendReminderEmail} = require("../utils/nodemailer.js")

/*
POST /api/v1/borrowers/email
Auth: yes
Access: private
*/
const sendEmail = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new CustomValidationError(errors.array(), 400);
    }

    const {borrowerName, borrowerEmail, borrowingAmount, yourMessage} = req.body
    const lenderId = req.user._id
    const lender = await User.findById(lenderId)
    

    // send email
    const emailSender = await sendReminderEmail(borrowerName, borrowerEmail, borrowingAmount, yourMessage, lender)

    if(!emailSender.success) {
        throw new CustomError(emailSender.message)
    }

    res.json({message: `email sent to ${borrowerName} successfully`})
  } catch (err) {
    next(new CustomError(err.message));
  }
};

module.exports = { sendEmail };
